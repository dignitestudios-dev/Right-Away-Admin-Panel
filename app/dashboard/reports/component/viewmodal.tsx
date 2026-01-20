import { FileImage, Mail, User, X } from "lucide-react";
import Image from "next/image";

export default function EnhancedReportsModal({
  onClose,
  selectedRequest,
}) {
const handleBlock = () => {
  alert("User Blocked");
  // API call later
};

const handleUnblock = () => {
  alert("User Unblocked");
  // API call later
};
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#1bae77] to-green-300 text-white p-6">
          <div className="flex justify-between">
            <div>
              <h2 className="text-2xl font-bold">
                {selectedRequest.title}
              </h2>
              <p className="text-sm opacity-90">
                {selectedRequest.type} Report
              </p>
            </div>
            <button onClick={onClose}>
              <X />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 space-y-6">

  
        

          {/* Reporter Info */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold mb-4">Reporter Information</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <User className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Name</p>
                  <p>{selectedRequest.reportedUserName}</p>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="text-green-600" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p>{selectedRequest.reportedUserEmail}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Reported User */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-semibold mb-4">Reported User</h3>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-500">Name</p>
                <p>{selectedRequest.reporterName}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Email</p>
                <p>{selectedRequest.reporterEmail}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-blue-50 border rounded-xl p-5">
            <h3 className="font-semibold mb-2">Report Description</h3>
            <p className="text-sm">{selectedRequest.description}</p>
          </div>

          {/* Documents */}
          {selectedRequest.documents?.length > 0 && (
            <div>
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <FileImage size={18} /> Attachments
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                {selectedRequest.documents.map((doc, i) => (
                  <Image
                    key={i}
                    src={doc.url}
                    alt={doc.name}
                    className="rounded-xl h-48 w-full object-cover"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
       {/* Footer */}
<div className="border-t p-6 bg-gray-50">
  <div className="flex justify-end gap-3">

    {/* Close */}
    <button
      onClick={onClose}
      className="border px-5 py-2 rounded-lg"
    >
      Close
    </button>

    {/* Block / Unblock */}
    {selectedRequest.isBlocked ? (
      <button
        onClick={handleUnblock}
        className="bg-blue-600 text-white px-5 py-2 rounded-lg"
      >
        Unblock User
      </button>
    ) : (
      <button
        onClick={handleBlock}
        className="bg-red-600 text-white px-5 py-2 rounded-lg"
      >
        Block User
      </button>
    )}

  </div>
</div>


      </div>
    </div>
  );
}
