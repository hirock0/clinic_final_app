
import { FiX } from 'react-icons/fi';

interface ApplyFormProps {
  job: {
    facilityName: string;
    position: string;
  };
  onClose: () => void;
}

const ApplyForm = ({ job, onClose }: ApplyFormProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    onClose(); // Close after submit
  };

  return (
    <div className="fixed inset-0 bg-black/5 backdrop-blur-xs bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FiX size={24} />
        </button>

        <h3 className="text-xl font-semibold mb-2">Apply to {job.facilityName}</h3>
        <p className="text-gray-600 mb-6">Position: {job.position}</p>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
              <input 
                type="text" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email*</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone*</label>
              <input 
                type="tel" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resume/CV*</label>
              <input 
                type="file" 
                accept=".pdf,.doc,.docx"
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Cover Letter</label>
              <textarea 
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <button 
            type="submit"
            className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;