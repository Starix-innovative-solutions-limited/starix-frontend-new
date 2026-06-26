import { useGetMyInvitations, useAcceptInvitation, useDeclineInvitation } from "@/hooks/useCircles";
import { useQueryClient } from "@tanstack/react-query";

const MyInvitationsList = () => {
  const { data: invites = [], isLoading } = useGetMyInvitations();
  const acceptMutation = useAcceptInvitation();
  const declineMutation = useDeclineInvitation();
  const queryClient = useQueryClient();

  if (isLoading) return <div>Loading invites...</div>;
  if (invites.length === 0) return <div>No pending invitations.</div>;

  return (
    <div className="space-y-4">
      {invites.map((invite: any) => (
        <div key={invite.invitation_id} className="flex items-center justify-between p-4 border rounded-2xl">
          <div className="flex items-center gap-3">
            <img src={invite.circle_profile_picture_url} className="w-12 h-12 rounded-full" />
            <div>
              <h4 className="font-semibold">{invite.circle_name}</h4>
              <p className="text-xs text-gray-500">{invite.member_count} members • Rank {invite.global_rank}</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => acceptMutation.mutate(invite.invitation_id, { 
                onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-invitations"] }) 
              })}
              className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm"
            >
              Accept
            </button>
            <button 
              onClick={() => declineMutation.mutate(invite.invitation_id, { 
                onSuccess: () => queryClient.invalidateQueries({ queryKey: ["my-invitations"] }) 
              })}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              Decline
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};