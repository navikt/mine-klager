'use client';

interface Props {
  label: string;
  value: unknown;
}

export const BrowserDebugLog = ({ label, value }: Props) => {
  console.debug(label, value);

  return null;
};
