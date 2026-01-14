import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createPortal } from 'react-dom';
import { CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react"
import { messageActions } from '../../store/message-slice';

const messageStyles = {
    success: {
        bgColor: 'bg-green-50 border-green-200',
        iconColor: "text-green-600",
        titleColor: "text-green-800",
        messageColor: "text-green-700",
        icon: CheckCircle,
    },
    warning: {
        bgColor: "bg-yellow-50 border-yellow-200",
        iconColor: "text-yellow-600",
        titleColor: "text-yellow-800",
        messageColor: "text-yellow-700",
        icon: AlertTriangle,
    },
    error: {
        bgColor: "bg-red-50 border-red-200",
        iconColor: "text-red-600",
        titleColor: "text-red-800",
        messageColor: "text-red-700",
        icon: AlertCircle,
    },
    info: {
        bgColor: "bg-blue-50 border-blue-200",
        iconColor: "text-blue-600",
        titleColor: "text-blue-800",
        messageColor: "text-blue-700",
        icon: Info,
    }
};

function MessageDisplayPortal({ children }) {
    return createPortal(
        <>{children}</>,
        document.getElementById('message-display')
    );
}

export default function MessageDisplay() {
    const dispatch = useDispatch();
    const { title, message, type, isVisible } = useSelector(state => state.showMessage);

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(messageActions.hideMessage());
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    useEffect(() => {
        if (message) {
            requestAnimationFrame(() => {
                dispatch(messageActions.toggleIsVisible(true));
            });
        } else {
            dispatch(messageActions.toggleIsVisible(false));
        }
    }, [message]);

    if (!message) {
        return null;
    }

    const styles = messageStyles[type] || messageStyles.info;
    const Icon = styles.icon

    return (
        <MessageDisplayPortal>
            <div className={`
                fixed top-4 right-4 z-50 p-4 rounded-lg shadow-xl text-white font-medium transform transition-transform duration-300 ease-in-out w-80
                ${styles.bgColor}
                ${isVisible ? 'translate-x-0' : 'translate-x-full'}
            `}>
                <div className="flex items-start gap-3">
                    <Icon className={`h-5 w-5 ${styles.iconColor} flex-shrink-0 mt-0.5`} />
                    <div className="flex-1 min-w-0">
                        <h4 className={`text-sm font-semibold ${styles.titleColor}`}>{title}</h4>
                        <p className={`text-sm mt-1 ${styles.messageColor}`}>{message}</p>
                    </div>
                </div>
            </div>
        </MessageDisplayPortal>
    );
}