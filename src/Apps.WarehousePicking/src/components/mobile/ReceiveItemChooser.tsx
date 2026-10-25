import { useState } from "react";
import { ItemPicker } from "@/components/mobile/ItemPicker";
import { NewItemDialog } from "@/components/mobile/NewItemDialog";
import type { PickItem } from "@/hooks/UsePickItems";
import { useStyles } from "@/styles/ReceiveItemChooser.styles";

type ReceiveItemChooserProps = {
  onSelect: (item: PickItem) => void;
};

// The first step of Receive: choose an existing item or create one by name before booking it in.
export function ReceiveItemChooser({ onSelect }: ReceiveItemChooserProps) {
  const styles = useStyles();
  const [newItemName, setNewItemName] = useState<string | null>(null);

  return (
    <div className={styles.root}>
      <ItemPicker onSelect={onSelect} onCreate={(search) => setNewItemName(search)} />

      <NewItemDialog
        open={newItemName !== null}
        onOpenChange={(open) => !open && setNewItemName(null)}
        defaults={{ name: newItemName ?? undefined }}
        onCreated={(item) => {
          setNewItemName(null);
          onSelect(item);
        }}
      />
    </div>
  );
}
