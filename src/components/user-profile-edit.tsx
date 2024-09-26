import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Textarea } from '@nextui-org/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

import { useProfileForm } from '../hooks';
import api from '../libs/api';
import { UserProfileProps } from '../types';

export default function ProfileEdit({
  currentProfile,
  onProfileUpdate,
}: {
  currentProfile: UserProfileProps;
  onProfileUpdate: (updatedProfile: UserProfileProps) => void;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { formData, errors, updateFormData, setErrors, resetForm } = useProfileForm(currentProfile);
  const [isSaving, setIsSaving] = useState(false);

  const onSubmit = async () => {
    setIsSaving(true);

    try {
      const result = await api.post('/api/profile', formData);
      if (result.data.success) {
        toast.success('Profile updated successfully');
        setIsModalOpen(false);
        onProfileUpdate(formData); // 调用回调函数通知上层数据更新
      } else if ('fieldErrors' in result.data) {
        setErrors(result.data.fieldErrors || {});
      } else {
        toast.error(result.data.error || 'Unknown error');
      }
    } catch (error) {
      toast.error('Unknown error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetData = () => {
    resetForm();
  };

  return (
    <>
      <Button
        className="absolute right-3 top-3 bg-white/20 text-white dark:bg-black/20"
        radius="full"
        size="sm"
        variant="light"
        onClick={() => setIsModalOpen(true)}>
        Edit Profile
      </Button>
      <Modal
        backdrop="blur"
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          handleResetData();
        }}>
        <ModalContent>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}>
            <ModalHeader>
              <h3>Edit Profile</h3>
            </ModalHeader>
            <ModalBody>
              <div className="space-y-4 transition-all duration-300">
                <Input
                  errorMessage={errors.username?._errors?.[0]}
                  isInvalid={!!errors.username}
                  label="Username"
                  value={formData.username}
                  onValueChange={(value) => updateFormData('username', value)}
                />
                <Input
                  errorMessage={errors.email?._errors?.[0]}
                  isInvalid={!!errors.email}
                  label="Email"
                  value={formData.email}
                  onValueChange={(value) => updateFormData('email', value)}
                />
                <Input
                  errorMessage={errors.mobile?._errors?.[0]}
                  isInvalid={!!errors.mobile}
                  label="Mobile"
                  value={formData.mobile}
                  onValueChange={(value) => updateFormData('mobile', value)}
                />
                <Textarea
                  errorMessage={errors.motto?._errors?.[0]}
                  isInvalid={!!errors.motto}
                  label="Motto"
                  value={formData.motto}
                  onValueChange={(value) => updateFormData('motto', value)}
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button color="primary" isLoading={isSaving} type="submit">
                {isSaving ? 'Saving...' : 'Save'}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
