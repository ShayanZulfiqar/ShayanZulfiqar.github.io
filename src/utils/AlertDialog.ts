import Swal from "sweetalert2";

const AlertDialog = (
  title: string,
  text: string,
  icon: "success" | "error" | "warning" | "info" | "question",
  timer: number,
  showConfirmButton: boolean = false,
  showCancelButton: boolean = false,
  confirmButtonText: string = "",
  cancelButtonText: string = "",
  okAction?: () => void | Promise<void>,
  cancelAction?: () => void | Promise<void>
) => {
  return Swal.fire({
    title: title !== "" ? title : undefined,
    text: text,
    icon: icon,
    timer: timer !== 0 ? timer : undefined,
    showConfirmButton: showConfirmButton,
    showCancelButton: showCancelButton,
    confirmButtonText: confirmButtonText,
    cancelButtonText: cancelButtonText,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    background: '#ffff',
    color: '#3085d6',
    customClass: {
      icon: "small-icon",
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
