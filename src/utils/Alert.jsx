import Swal from "sweetalert2";

const AlertDialog = (
  title,
  text,
  icon,
  timer,
  showConfirmButton = false,
  showCancelButton = false,
  confirmButtonText = "",
  cancelButtonText = "",
  okAction,
  cancelAction
) => {
  // Enhanced color schemes based on icon type
  const colorSchemes = {
    success: {
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      iconColor: '#10b981',
      background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
    },
    error: {
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      iconColor: '#ef4444',
      background: 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)',
    },
    warning: {
      confirmButtonColor: '#f59e0b',
      cancelButtonColor: '#6b7280',
      iconColor: '#f59e0b',
      background: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)',
    },
    info: {
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      iconColor: '#3b82f6',
      background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    },
    question: {
      confirmButtonColor: '#8b5cf6',
      cancelButtonColor: '#6b7280',
      iconColor: '#8b5cf6',
      background: 'linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%)',
    },
  };

  const scheme = colorSchemes[icon] || colorSchemes.info;

  return Swal.fire({
    title: title !== "" ? title : null,
    text: text,
    icon: icon,
    timer: timer !== 0 ? timer : null,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText || 'Confirm',
    cancelButtonText: cancelButtonText || 'Cancel',
    confirmButtonColor: scheme.confirmButtonColor,
    cancelButtonColor: scheme.cancelButtonColor,
    iconColor: scheme.iconColor,
    background: scheme.background,
    color: '#1f2937',
    backdrop: `
      rgba(0,0,0,0.4)
      left top
      no-repeat
    `,
    customClass: {
      popup: 'animated-popup',
      title: 'animated-title',
      htmlContainer: 'animated-text',
      confirmButton: 'animated-confirm-button',
      cancelButton: 'animated-cancel-button',
      icon: 'animated-icon',
    },
    buttonsStyling: true,
    showClass: {
      popup: 'animate__animated animate__fadeInDown animate__faster'
    },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp animate__faster'
    },
  }).then(async (result) => {
    if (result.isConfirmed && okAction) {
      await okAction();
    } else if (result.isDismissed && cancelAction) {
      await cancelAction();
    }
  });
};

export default AlertDialog;
