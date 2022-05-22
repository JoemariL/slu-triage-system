import { Modal, ModalHeader, ModalContent } from "../../../common/Modal";
import { Button, Input, Alert } from "../../../common";

function UserResetPassword({
  PASSWORD_RESET_CODE,
  CLOSE = () => {},
  CANCEL = () => {},
  RESET = () => {},
  loading = () => {},
}) {
  return (
    <>
      <ModalHeader close={CLOSE}>Manage User / Password Reset</ModalHeader>

      <div className="mt-16 space-y-5">
        <Input
          placeholder="The Reset Password Code will display here."
          disabled
          value={PASSWORD_RESET_CODE}
          loading={loading}
        />

        <Alert
          header="Warning"
          message="The previous password of this account will become invalid and will be replaced by the newly generated password code. Only use this feature for forgotten or lost passwords."
          warning
        />

        <div className="grid grid-cols-2 justify-center items-center gap-x-3">
          <Button
            className="bg-gray-600 text-white ... rounded"
            label="CANCEL"
            onClick={CANCEL}
          />
          <Button
            className="bg-blue-600 text-white ... rounded"
            label="GET RESET PASSWORD CODE"
            onClick={RESET}
            loading={loading}
          />
        </div>
      </div>
    </>
  );
}

export default UserResetPassword;
