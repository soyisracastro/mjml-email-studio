import { Img, Section, Hr } from '@react-email/components';

interface HeaderProps {
  logoUrl?: string;
  logoWidth?: number;
}

export const Header = ({
  logoUrl = 'https://s3.us-east-1.amazonaws.com/todoconta.com/uploads/isotipo-dark.png',
  logoWidth = 160
}: HeaderProps) => {
  return (
    <>
      <Section className="bg-white py-8 text-center">
        <Img
          src={logoUrl}
          width={logoWidth}
          alt="Todoconta"
          className="mx-auto"
        />
      </Section>
      <Hr className="border-0 h-1 bg-teal-600 my-0" />
    </>
  );
};
