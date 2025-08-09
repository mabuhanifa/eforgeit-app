import { Dialog } from "@headlessui/react";
import { Video } from "lucide-react";
import Button from "../ui/Button";

interface ProctoringConsentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const ProctoringConsentModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading,
}: ProctoringConsentModalProps) => {
  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-lg rounded-lg bg-white p-6">
          <Dialog.Title className="flex items-center gap-2 text-lg font-bold">
            <Video className="text-indigo-600" />
            Live Proctoring Consent
          </Dialog.Title>
          <Dialog.Description className="mt-4 space-y-2 text-sm text-gray-600">
            <p>
              To ensure the integrity of this assessment, this session will be
              recorded using your webcam.
            </p>
            <p>
              By proceeding, you consent to the collection and use of this video
              data for proctoring purposes. Please ensure you are in a well-lit
              room and alone.
            </p>
          </Dialog.Description>
          <div className="mt-6 flex justify-end gap-4">
            <Button
              onClick={onClose}
              className="bg-gray-200 text-gray-800 hover:bg-gray-300"
            >
              Cancel
            </Button>
            <Button onClick={onConfirm} disabled={isLoading}>
              {isLoading ? "Starting..." : "Agree & Start Assessment"}
            </Button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ProctoringConsentModal;
