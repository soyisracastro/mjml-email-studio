import { Section, Column, Row, Text, Link, Hr } from '@react-email/components';

export const Footer = () => {
  return (
    <Section className="bg-gray-800 px-5 py-10">
      <Row>
        <Column>
          <Text className="text-white text-lg font-bold mb-2">
            Todoconta
          </Text>
          <Text className="text-gray-400 text-sm mb-6">
            Contabilidad con un toque humano
          </Text>

          <Text className="text-white text-base font-semibold mb-3">
            Síguenos en redes:
          </Text>

          <Row className="mb-6">
            <Column className="pr-2">
              <Link href="https://facebook.com/todoconta" className="text-teal-500 text-sm hover:text-teal-400">
                Facebook
              </Link>
            </Column>
            <Column className="px-2">
              <Link href="https://twitter.com/todoconta" className="text-teal-500 text-sm hover:text-teal-400">
                Twitter
              </Link>
            </Column>
            <Column className="px-2">
              <Link href="https://linkedin.com/company/todoconta" className="text-teal-500 text-sm hover:text-teal-400">
                LinkedIn
              </Link>
            </Column>
            <Column className="pl-2">
              <Link href="https://instagram.com/todoconta" className="text-teal-500 text-sm hover:text-teal-400">
                Instagram
              </Link>
            </Column>
          </Row>

          <Text className="text-white text-base font-semibold mb-3">
            Contacto:
          </Text>

          <Text className="text-gray-400 text-sm mb-2">
            📧 <Link href="mailto:israel@todoconta.com" className="text-teal-500 hover:text-teal-400">
              israel@todoconta.com
            </Link>
          </Text>
          <Text className="text-gray-400 text-sm mb-2">
            📞 <Link href="tel:+5215544753602" className="text-teal-500 hover:text-teal-400">
              +52 1 55 4475 3602
            </Link>
          </Text>
          <Text className="text-gray-400 text-sm mb-6">
            💬 <Link href="https://wa.me/5215544753602" className="text-teal-500 hover:text-teal-400">
              WhatsApp
            </Link>
          </Text>

          <Hr className="border-gray-700 my-6" />

          <Text className="text-gray-400 text-xs mb-2">
            <Link href="https://todoconta.com/privacy" className="text-gray-400 hover:text-teal-500 mr-4">
              Política de Privacidad
            </Link>
            <Link href="https://todoconta.com/terms" className="text-gray-400 hover:text-teal-500">
              Términos y Condiciones
            </Link>
          </Text>

          <Text className="text-gray-500 text-xs mb-2">
            © 2025 Todoconta. Todos los derechos reservados.
          </Text>

          <Text className="text-gray-500 text-xs">
            <Link href="{{unsubscribe_url}}" className="text-gray-500 hover:text-teal-500">
              Darse de baja
            </Link>
          </Text>
        </Column>
      </Row>
    </Section>
  );
};
