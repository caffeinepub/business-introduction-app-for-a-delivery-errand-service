import { ReactNode } from 'react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useGetCallerUserRole } from '../../hooks/useAdminRequests';
import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle, Loader2, Lock } from 'lucide-react';
import LoginButton from './LoginButton';

interface AdminRouteGuardProps {
  children: ReactNode;
}

export default function AdminRouteGuard({ children }: AdminRouteGuardProps) {
  const { identity, isInitializing } = useInternetIdentity();
  const { data: userRole, isLoading: isLoadingRole, error } = useGetCallerUserRole();

  // Show loading state while initializing identity or checking role
  if (isInitializing || (identity && isLoadingRole)) {
    return (
      <div className="section-container flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!identity) {
    return (
      <div className="section-container flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold mb-2">Authentication Required</h2>
              <p className="text-muted-foreground mb-6">
                Please log in to access the admin area.
              </p>
              <LoginButton />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error checking role
  if (error) {
    return (
      <div className="section-container flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full border-destructive">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold mb-2">Access Error</h2>
              <p className="text-muted-foreground mb-6">
                Failed to verify your permissions. Please try again.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Not an admin
  if (userRole !== 'admin') {
    return (
      <div className="section-container flex items-center justify-center min-h-[60vh]">
        <Card className="max-w-md w-full border-destructive">
          <CardContent className="pt-6">
            <div className="text-center">
              <AlertCircle className="h-16 w-16 text-destructive mx-auto mb-4" />
              <h2 className="font-heading text-2xl font-bold mb-2">Access Denied</h2>
              <p className="text-muted-foreground mb-6">
                You do not have permission to access this area. Admin privileges are required.
              </p>
              <button
                onClick={() => window.location.hash = ''}
                className="btn-primary"
              >
                Return to Home
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // User is authenticated and is an admin
  return <>{children}</>;
}

