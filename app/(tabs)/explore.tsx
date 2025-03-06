import { StyleSheet } from 'react-native';
import { Text } from '@/components/ui/text';
import {
  Drawer,
  DrawerBackdrop,
  DrawerContent,
  DrawerBody,
  DrawerFooter,
} from "@/components/ui/drawer"
import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogBody,
} from '@/components/ui/alert-dialog';
import { Button, ButtonText } from '@/components/ui/button';
import { useState } from 'react';

export default function TabTwoScreen() {
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const handleClose = () => setShowAlertDialog(false);

  return (
    <>
      <Button onPress={() => setShowDrawer(true)} className="mb-5">
        <ButtonText>Open Drawer!</ButtonText>
      </Button>
      <Drawer
        isOpen={showDrawer}
        onClose={() => {
          setShowDrawer(false)
        }}
        size="sm"
        anchor="left"
      >
        <DrawerBackdrop />
        <DrawerContent>
          <DrawerBody>
            <Text size="2xl" className="text-typography-800">
              This is a sentence.
            </Text>
          </DrawerBody>
          <DrawerFooter>
            <Button onPress={() => setShowDrawer(false)}>
              <ButtonText>Close Drawer!</ButtonText>
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Button onPress={() => setShowAlertDialog(true)}>
        <ButtonText>Open Dialog</ButtonText>
      </Button>
      <AlertDialog isOpen={showAlertDialog} onClose={handleClose} size="md">
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
          </AlertDialogHeader>
          <AlertDialogBody className="mt-3 mb-4">
            <Text size="sm">
              Deleting the post will remove it permanently and cannot be undone.
              Please confirm if you want to proceed.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter className="">
            <Button
              variant="outline"
              action="secondary"
              onPress={handleClose}
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button size="sm" onPress={handleClose}>
              <ButtonText>Delete</ButtonText>
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
