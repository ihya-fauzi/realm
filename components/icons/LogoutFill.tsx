import * as React from "react";
import { SVGProps } from "react";
const SvgLogoutFill = (props: SVGProps<SVGSVGElement> & { size: string }) => (
  <div className={props.className}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={props.size}
      height={props.size}
      viewBox="0 0 48 48"
    >
      <path d="M32.25 31.65q-.45-.45-.45-1.1 0-.65.45-1.05l4-4h-16q-.65 0-1.075-.425-.425-.425-.425-1.075 0-.65.425-1.075.425-.425 1.075-.425h15.9l-4.05-4.05q-.4-.4-.4-1.025 0-.625.45-1.075.45-.45 1.075-.45t1.075.45L40.95 23q.25.25.35.5.1.25.1.55 0 .3-.1.55-.1.25-.35.5l-6.6 6.6q-.4.4-1.025.4-.625 0-1.075-.45ZM9 42q-1.2 0-2.1-.9Q6 40.2 6 39V9q0-1.2.9-2.1Q7.8 6 9 6h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 9 22.05 9H9v30h13.05q.65 0 1.075.425.425.425.425 1.075 0 .65-.425 1.075Q22.7 42 22.05 42Z" />
    </svg>
  </div>
);
export default SvgLogoutFill;
