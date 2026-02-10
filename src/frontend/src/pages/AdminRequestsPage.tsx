import { useState } from 'react';
import AdminRouteGuard from '../components/auth/AdminRouteGuard';
import { useGetAllRequests, useGetRequestById } from '../hooks/useAdminRequests';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2 } from 'lucide-react';
import type { ContactRequest } from '../backend';

export default function AdminRequestsPage() {
  return (
    <AdminRouteGuard>
      <AdminRequestsContent />
    </AdminRouteGuard>
  );
}

function AdminRequestsContent() {
  const [selectedRequestId, setSelectedRequestId] = useState<bigint | null>(null);
  const { data: requests, isLoading, error } = useGetAllRequests();
  const { data: selectedRequest, isLoading: isLoadingDetail } = useGetRequestById(selectedRequestId);

  if (isLoading) {
    return (
      <div className="section-container flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="section-container">
        <Card className="border-destructive">
          <CardContent className="pt-6">
            <p className="text-destructive">Failed to load requests. Please try again.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const sortedRequests = [...(requests || [])].sort((a, b) => 
    Number(b.submittedAt - a.submittedAt)
  );

  return (
    <div className="section-container">
      <div className="mb-8">
        <h1 className="font-heading text-3xl sm:text-4xl font-bold mb-2">Request Management</h1>
        <p className="text-muted-foreground">
          Review and manage customer service requests
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Requests List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>All Requests</span>
              <Badge variant="secondary">{sortedRequests.length}</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px] pr-4">
              {sortedRequests.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">No requests yet</p>
              ) : (
                <div className="space-y-3">
                  {sortedRequests.map((request) => (
                    <RequestListItem
                      key={request.id.toString()}
                      request={request}
                      isSelected={selectedRequestId?.toString() === request.id.toString()}
                      onClick={() => setSelectedRequestId(request.id)}
                    />
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Request Detail */}
        <Card>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedRequestId ? (
              <p className="text-muted-foreground text-center py-8">
                Select a request to view details
              </p>
            ) : isLoadingDetail ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : selectedRequest ? (
              <RequestDetail request={selectedRequest} />
            ) : (
              <p className="text-destructive text-center py-8">Failed to load request details</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function RequestListItem({
  request,
  isSelected,
  onClick
}: {
  request: ContactRequest;
  isSelected: boolean;
  onClick: () => void;
}) {
  const date = new Date(Number(request.submittedAt) / 1000000);
  
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-lg border transition-colors ${
        isSelected
          ? 'border-primary bg-accent'
          : 'border-border hover:border-primary/50 hover:bg-accent/50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold">{request.name}</h3>
        <Badge variant="outline" className="text-xs">
          #{request.id.toString()}
        </Badge>
      </div>
      <p className="text-sm text-muted-foreground mb-1">{request.email}</p>
      <p className="text-xs text-muted-foreground">
        {date.toLocaleDateString()} at {date.toLocaleTimeString()}
      </p>
    </button>
  );
}

function RequestDetail({ request }: { request: ContactRequest }) {
  const date = new Date(Number(request.submittedAt) / 1000000);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-1">Request ID</h3>
        <p className="text-muted-foreground">#{request.id.toString()}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Customer Name</h3>
        <p className="text-muted-foreground">{request.name}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Email</h3>
        <p className="text-muted-foreground">{request.email}</p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-1">Submitted</h3>
        <p className="text-muted-foreground">
          {date.toLocaleDateString()} at {date.toLocaleTimeString()}
        </p>
      </div>
      
      <div>
        <h3 className="font-semibold mb-2">Request Details</h3>
        <div className="bg-muted p-4 rounded-lg">
          <pre className="whitespace-pre-wrap text-sm font-sans">{request.message}</pre>
        </div>
      </div>
    </div>
  );
}

