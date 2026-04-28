import { useState, useEffect, type ChangeEvent, type FormEvent } from 'react';
import axios from 'axios';
import { AlertTriangle, CheckCircle, Upload } from 'lucide-react';

interface Beach {
  _id: string;
  name: string;
  location: string;
}

const Report = () => {
  const [beaches, setBeaches] = useState<Beach[]>([]);
  const [formData, setFormData] = useState({
    beachId: '',
    wasteLevel: '',
    description: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/beaches')
      .then(res => setBeaches(res.data))
      .catch(() => {});
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const selected = beaches.find(b => b._id === formData.beachId);
    if (!selected || !formData.wasteLevel || !formData.description) {
      setMessage('Please fill in all required fields.');
      setStatus('error');
      return;
    }
    setStatus('loading');
    try {
      await axios.put(`http://localhost:5000/api/beaches/${formData.beachId}`, {
        wasteLevel: formData.wasteLevel,
        description: formData.description,
      });
      setStatus('success');
      setMessage(`Report submitted for ${selected.name}. Thank you for helping!`);
      setFormData({ beachId: '', wasteLevel: '', description: '' });
      setSelectedFile(null);
    } catch {
      setStatus('error');
      setMessage('Failed to submit report. Please try again.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Report Garbage</h1>
        <p className="text-slate-600">Spotted waste on a beach? Report it and help us take action.</p>
      </div>

      {status === 'success' && (
        <div className="mb-6 bg-emerald-50 border border-emerald-200 rounded-xl p-5 flex items-center gap-3">
          <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
          <p className="text-emerald-800 font-medium">{message}</p>
        </div>
      )}
      {status === 'error' && (
        <div className="mb-6 bg-rose-50 border border-rose-200 rounded-xl p-5 flex items-center gap-3">
          <AlertTriangle className="h-6 w-6 text-rose-500 shrink-0" />
          <p className="text-rose-800 font-medium">{message}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-6">
        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="beachId">
            Select Beach <span className="text-rose-500">*</span>
          </label>
          <select
            id="beachId"
            name="beachId"
            value={formData.beachId}
            onChange={handleChange}
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 bg-white"
            required
          >
            <option value="">-- Choose a beach --</option>
            {beaches.map(beach => (
              <option key={beach._id} value={beach._id}>{beach.name} — {beach.location}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Waste Level <span className="text-rose-500">*</span>
          </label>
          <div className="flex gap-4">
            {['low', 'moderate', 'high'].map(level => (
              <label
                key={level}
                className={`flex-1 text-center cursor-pointer py-3 rounded-lg border-2 font-semibold capitalize transition-all ${
                  formData.wasteLevel === level
                    ? level === 'low' ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                      : level === 'moderate' ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-rose-500 bg-rose-50 text-rose-700'
                    : 'border-slate-200 text-slate-500 hover:border-slate-300'
                }`}
              >
                <input
                  type="radio"
                  name="wasteLevel"
                  value={level}
                  checked={formData.wasteLevel === level}
                  onChange={handleChange}
                  className="hidden"
                />
                {level}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2" htmlFor="description">
            Description <span className="text-rose-500">*</span>
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe what you observed (e.g., plastic bags near the shoreline, oil spill...)"
            className="w-full border border-slate-300 rounded-lg px-4 py-3 text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">
            Photo (Optional)
          </label>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-sky-400 hover:bg-sky-50 transition-colors bg-slate-50">
            <Upload className="h-7 w-7 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500">
              {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
            </span>
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
        </div>

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full bg-sky-600 text-white py-3 rounded-lg font-bold text-lg hover:bg-sky-700 transition-colors shadow-sm disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {status === 'loading' ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
};

export default Report;
