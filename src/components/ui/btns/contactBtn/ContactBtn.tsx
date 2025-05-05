import Link from "next/link";
const ContactBtn = ({ design }: { design: any }) => {
  return (
    <div>
      <Link href="/contact" className={design}>
        contact us
      </Link>
    </div>
  );
};

export default ContactBtn;
