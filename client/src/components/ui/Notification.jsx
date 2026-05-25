import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaExclamationCircle } from 'react-icons/fa';

const icons = {
  success: <FaCheckCircle className="text-green-500" />,
  error: <FaTimesCircle className="text-red-500" />,
  info: <FaInfoCircle className="text-blue-500" />,
  warning: <FaExclamationCircle className="text-yellow-500" />,
};

const Notification = ({ notification }) => {
  const { message, type = 'info' } = notification;

  return (
    <div
      id="notification-toast"
      role="alert"
      aria-live="polite"
      className="fixed bottom-6 right-6 z-[100] animate-slide-up"
    >
      <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg border border-gray-100 px-5 py-4 min-w-64 max-w-sm">
        <span className="text-xl flex-shrink-0">{icons[type]}</span>
        <p className="text-sm font-medium text-navy">{message}</p>
      </div>
    </div>
  );
};

export default Notification;
