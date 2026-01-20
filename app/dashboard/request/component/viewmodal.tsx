import { X, User, Mail, Calendar, CheckCircle, XCircle, FileImage } from 'lucide-react';

export default function EnhancedRequestModal( {onClose, selectedRequest}: {onClose: () => void, selectedRequest: any}  ) {
  
  // Sample data with images


  const handleAccept = () => {
    alert("Request Accepted!");
    onClose();
  };

  const handleReject = () => {
    alert("Request Rejected!");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden shadow-2xl">
        
        {/* Header with gradient */}
        <div className="bg-gradient-to-r from-[#1bae77] to-green-300 text-white p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-1">Request Details</h2>
              <p className="text-blue-100 text-sm">Review the request information carefully</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
         <div className="overflow-y-auto max-h-[calc(95vh-200px)] p-6">

  {/* User Avatar + Name */}
  <div className="flex items-center gap-4 mb-6">
    {selectedRequest.avatar ? (
      <img
        src={selectedRequest.avatar}
        alt={selectedRequest.name}
        className="h-16 w-16 rounded-full object-cover border-2 border-[#1bae77]"
      />
    ) : (
      <div className="h-16 w-16 rounded-full bg-[#1bae77] text-white flex items-center justify-center font-bold text-lg">
        {selectedRequest.name
}
      </div>
    )}
    <div>
      <h2 className="text-xl font-semibold text-gray-900">{selectedRequest.name}</h2>
      <p className="text-sm text-gray-500">{selectedRequest.role}</p>
    </div>
  </div>

  {/* Status Badge */}
  <div className="mb-6 flex flex-wrap gap-2">
    <span
      className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
        selectedRequest.status === "Pending"
          ? "bg-yellow-100 text-yellow-800"
          : selectedRequest.status === "Approved"
          ? "bg-green-100 text-green-800"
          : "bg-red-100 text-red-800"
      }`}
    >
      {selectedRequest.status}
    </span>
    {selectedRequest.priority && (
      <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-red-100 text-red-800">
        {selectedRequest.priority} Priority
      </span>
    )}
  </div>

  {/* Personal Information */}
  <div className="bg-gray-50 rounded-xl p-5 mb-6">
    <h3 className="text-lg font-semibold mb-4 text-gray-800">Personal Information</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Name */}
      <div className="flex items-start gap-3">
        <User className="text-green-600 mt-1" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase">Name</p>
          <p className="text-sm font-medium text-gray-900">{selectedRequest.name}</p>
        </div>
      </div>

      {/* Email */}
      <div className="flex items-start gap-3">
        <Mail className="text-green-600 mt-1" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase">Email</p>
          <p className="text-sm font-medium text-gray-900">{selectedRequest.email}</p>
        </div>
      </div>

      {/* Role */}
      <div className="flex items-start gap-3">
        <User className="text-green-600 mt-1" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase">Role</p>
          <p className="text-sm font-medium text-gray-900">{selectedRequest.role}</p>
        </div>
      </div>

      {/* Request Date */}
      <div className="flex items-start gap-3">
        <Calendar className="text-[#1bae77] mt-1" size={20} />
        <div>
          <p className="text-xs text-gray-500 uppercase">Request Date</p>
          <p className="text-sm font-medium text-gray-900">{selectedRequest.requestDate}</p>
        </div>
      </div>

      {/* Department */}
      {selectedRequest.department && (
        <div className="flex items-start gap-3">
          <User className="text-[#1bae77] mt-1" size={20} />
          <div>
            <p className="text-xs text-gray-500 uppercase">Department</p>
            <p className="text-sm font-medium text-gray-900">{selectedRequest.department}</p>
          </div>
        </div>
      )}

      {/* Phone */}
      {selectedRequest.phone && (
        <div className="flex items-start gap-3">
          <Mail className="text-[#1bae77] mt-1" size={20} />
          <div>
            <p className="text-xs text-gray-500 uppercase">Phone</p>
            <p className="text-sm font-medium text-gray-900">{selectedRequest.phone}</p>
          </div>
        </div>
      )}
    </div>
  </div>

  {/* Message / Description */}
  {selectedRequest.message && (
    <div className="bg-blue-50 rounded-xl p-5 mb-6 border border-blue-100">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Request Message</h3>
      <p className="text-sm text-gray-700 leading-relaxed">{selectedRequest.message}</p>
    </div>
  )}

  {/* Attached Documents / Images */}
  {selectedRequest.documents && selectedRequest.documents.length > 0 && (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 flex items-center gap-2">
        <FileImage size={20} className="text-[#1bae77]" />
        Attached Documents
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {selectedRequest.documents.map((doc, index) => (
          <div
            key={index}
            className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
          >
            <img src={doc.url} alt={doc.name} className="w-full h-48 object-cover" />
            <div className="p-3 bg-gray-50">
              <p className="text-sm font-medium text-gray-800">{doc.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )}

</div>


        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex flex-col sm:flex-row justify-end gap-3">
            <button
           onClick={onClose}
              className="px-6 py-2.5 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={handleReject}
              className="px-6 py-2.5 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
            >
              <XCircle size={20} />
              Reject
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2.5 bg-[#1bae77] text-white rounded-lg font-medium hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
            >
              <CheckCircle size={20} />
              Accept
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}