import Runtime "mo:core/Runtime";
import Principal "mo:core/Principal";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Map "mo:core/Map";
import MixinAuthorization "authorization/MixinAuthorization";
import AccessControl "authorization/access-control";

actor {
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  public type UserProfile = {
    name : Text;
  };

  let userProfiles = Map.empty<Principal, UserProfile>();

  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  type ContactRequest = {
    id : Nat;
    name : Text;
    email : Text;
    message : Text;
    submittedAt : Time.Time;
  };

  var nextRequestId : Nat = 0;
  var requests : [ContactRequest] = [];

  public func submitContactRequest(name : Text, email : Text, message : Text) : async Nat {
    let requestId = nextRequestId;
    let request : ContactRequest = {
      id = requestId;
      name;
      email;
      message;
      submittedAt = Time.now();
    };
    requests := requests.concat([request]);
    nextRequestId += 1;
    requestId;
  };

  public query ({ caller }) func getAllRequests() : async [ContactRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    requests;
  };

  public query ({ caller }) func getRequestById(requestId : Nat) : async ContactRequest {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    switch (requests.find(func(entry) { entry.id == requestId })) {
      case null { Runtime.trap("Request not found") };
      case (?contactRequest) { contactRequest };
    };
  };

  public query ({ caller }) func getRequestCount() : async Nat {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    requests.size();
  };

  public query ({ caller }) func getRequestsByEmail(email : Text) : async [ContactRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    requests.filter(func(request) { request.email == email });
  };

  public query ({ caller }) func getPagedRequests(page : Nat, pageSize : Nat) : async [ContactRequest] {
    if (not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only admins can view requests");
    };
    let start = page * pageSize;
    if (start >= requests.size()) { return [] };
    let end = if (start + pageSize > requests.size()) {
      requests.size();
    } else {
      start + pageSize;
    };
    requests.sliceToArray(start, end);
  };
};
