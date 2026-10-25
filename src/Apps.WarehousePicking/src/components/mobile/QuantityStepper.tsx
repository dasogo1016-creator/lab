import { useState } from "react";
import { Body1, Button, Input, Label } from "@fluentui/react-components";
import { AddRegular, SubtractRegular } from "@fluentui/react-icons";
import { useStyles } from "@/styles/QuantityStepper.styles";

type QuantityStepperProps = {
  id: string;
  label: string;
  /** null while the field is empty. */
  value: number | null;
  onChange: (value: number | null) => void;
  /** Quiet help under the field, e.g. "Available: 12". */
  hint?: string;
};

// A whole-number field for a thumb: big − and + buttons around a large numeric input (the numeric
// keyboard comes up on phones).
export function QuantityStepper({ id, label, value, onChange, hint }: QuantityStepperProps) {
  const styles = useStyles();
  const current = value ?? 0;
  const [typed, setTyped] = useState<string | null>(null);
  const showTyped = typed !== null && (value === null || Number(typed) === value);
  const step = (next: number) => {
    setTyped(null);
    onChange(next);
  };

  const input = (
    <Input
      id={id}
      className={styles.input}
      size="large"
      type="number"
      step="1"
      value={showTyped ? typed : value === null ? "" : String(value)}
      onChange={(_, data) => {
        setTyped(data.value);
        onChange(data.value === "" ? null : Number(data.value));
      }}
    />
  );

  return (
    <div className={styles.root}>
      <Label htmlFor={id} size="large">
        {label}
      </Label>
      <div className={styles.row}>
        <Button
          className={styles.step}
          size="large"
          icon={<SubtractRegular />}
          aria-label="Decrease"
          onClick={() => step(current - 1)}
        />
        {input}
        <Button
          className={styles.step}
          size="large"
          icon={<AddRegular />}
          aria-label="Increase"
          onClick={() => step(current + 1)}
        />
      </div>
      {hint && <Body1 className={styles.hint}>{hint}</Body1>}
    </div>
  );
}
