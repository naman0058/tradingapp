interface IFormatNumberProps {
  num: number;
  decimalSeparator?: string;
  thousandSeparator?: string;
}
export function formatNumber({
  num,
  decimalSeparator = '.',
  thousandSeparator = ',',
}: IFormatNumberProps): string {
  const nums = num.toString().split('.');
  const n = nums[0];

  const res = n.replace(/\d(?=(?:\d{3})+(?:\.|$))/g, (v) => {
    return v + thousandSeparator;
  });

  return res + (nums.length > 1 ? decimalSeparator + nums[1] : '');
}
