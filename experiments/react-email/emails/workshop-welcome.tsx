import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Row,
  Column,
  Text,
  Link,
  Button,
  Hr,
  Tailwind,
} from '@react-email/components';
import { Header } from '../components/header';
import { Footer } from '../components/footer';

interface WorkshopWelcomeProps {
  nombre: string;
  plan_name: string;
  monto: number;
  order_number: string;
  sessions?: Array<{
    title: string;
    date: string;
    time: string;
    module: string;
    zoomLink: string;
  }>;
}

const defaultSessions = [
  {
    title: 'Sesión 1',
    date: 'Martes 14 de octubre',
    time: '5:30-7:00 PM',
    module: 'Módulo 1: Fundamentos de IA y Mentalidad IA-First',
    zoomLink: 'https://us02web.zoom.us/j/84269970625?pwd=xkYH0OL5xSU4ODko3C03nAnSG2Y5Pc.1'
  },
  {
    title: 'Sesión 2',
    date: 'Jueves 16 de octubre',
    time: '5:30-7:30 PM',
    module: 'Módulo 2: Prompts y Asistentes Especializados',
    zoomLink: 'https://us02web.zoom.us/j/87841680031?pwd=DzSmQ2rXcma1Nt1EoylDW2d0n2qNr7.1'
  },
  {
    title: 'Sesión 3',
    date: 'Martes 21 de octubre',
    time: '5:30-8:00 PM',
    module: 'Módulo 3: Herramientas Avanzadas y Ecosistema',
    zoomLink: 'https://us02web.zoom.us/j/82553599958?pwd=a0H4mW8mlNvaooaERlGDkVeRQYinwv.1'
  },
  {
    title: 'Sesión 4',
    date: 'Jueves 23 de octubre',
    time: '5:30-7:30 PM',
    module: 'Módulo 4: Monetización y Consultoría IA',
    zoomLink: 'https://us02web.zoom.us/j/81119770860?pwd=mDbA7VIVydfV78MR9UP31JbLp2lf8m.1'
  },
  {
    title: 'Sesión Q&A',
    date: 'Viernes 24 de octubre',
    time: '10:00-11:00 AM',
    module: 'Sesión Especial de Q&A',
    zoomLink: 'https://us02web.zoom.us/j/88549211438?pwd=8QysIS0pkb76XTyMTHIsqz3IM53vKL.1'
  }
];

export default function WorkshopWelcomeEmail({
  nombre = 'Juan',
  plan_name = 'Plan Pro',
  monto = 2997,
  order_number = 'TC-2025-001',
  sessions = defaultSessions
}: WorkshopWelcomeProps) {
  const isPremium = plan_name.toLowerCase().includes('premium');

  return (
    <Html>
      <Head />
      <Preview>Tu inscripción está confirmada. Tus accesos + lo que sigue</Preview>
      <Tailwind>
        <Body className="bg-gray-100 font-sans">
          <Container className="max-w-2xl mx-auto">
            <Header />

            {/* Hero Section */}
            <Section className="bg-teal-600 px-5 py-10">
              <Text className="text-white text-4xl font-extrabold text-center mb-2">
                ¡Te doy la bienvenida al Taller! 👋
              </Text>
              <Text className="text-sky-100 text-xl text-center font-semibold">
                Tus accesos + lo que sigue
              </Text>
            </Section>

            {/* Greeting */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-800 text-lg mb-3">
                Hola <strong>{nombre}</strong>,
              </Text>
              <Text className="text-gray-800 text-xl font-bold mb-3">
                Tu inscripción está confirmada.
              </Text>
              <Text className="text-gray-600 text-base leading-relaxed">
                Gracias por confiar en este proceso. Estoy genuinamente emocionado de que formes parte de esto.
              </Text>
            </Section>

            {/* Registration Confirmation */}
            <Section className="bg-white px-5 py-5">
              <Text className="text-gray-800 text-2xl font-bold mb-5">
                ✅ Confirmación de Tu Registro
              </Text>

              <table className="w-full border-collapse">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3.5 text-gray-500 text-sm">Plan contratado:</td>
                    <td className="py-3.5 text-gray-800 font-semibold text-right">{plan_name}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3.5 text-gray-500 text-sm">Fecha de inicio:</td>
                    <td className="py-3.5 text-gray-800 font-semibold text-right">14 de octubre, 2025</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3.5 text-gray-500 text-sm">Horario:</td>
                    <td className="py-3.5 text-gray-800 font-semibold text-right">5:30 PM (CST México)</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3.5 text-gray-500 text-sm">Tu inversión:</td>
                    <td className="py-3.5 text-teal-600 font-bold text-lg text-right">
                      ${monto.toLocaleString('es-MX')} MXN
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3.5 text-gray-500 text-sm">Registro:</td>
                    <td className="py-3.5 text-teal-600 font-bold text-lg text-right">{order_number}</td>
                  </tr>
                </tbody>
              </table>
            </Section>

            {/* Schedule Section */}
            <Section className="bg-gray-50 px-5 py-8">
              <Text className="text-gray-800 text-2xl font-bold mb-4">
                📅 Las Fechas Completas
              </Text>
              <Text className="text-gray-600 text-sm mb-6">
                Guarda estas fechas en tu calendario:
              </Text>

              {sessions.map((session, index) => (
                <div key={index} className="mb-6">
                  <Text className="text-gray-800 font-bold text-base mb-2">
                    {session.date} | {session.time}
                  </Text>
                  <Text className="text-gray-600 text-sm mb-3">
                    {session.module}
                  </Text>
                  <Button
                    href={session.zoomLink}
                    className="bg-teal-600 text-white text-sm font-semibold px-6 py-2.5 rounded-md"
                  >
                    🔗 Enlace {session.title}
                  </Button>
                </div>
              ))}
            </Section>

            {/* Access Links */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-800 text-2xl font-bold mb-4">
                🔗 Tus Accesos
              </Text>

              <Text className="text-gray-800 font-bold text-base mb-2">
                Grupo de WhatsApp (IMPORTANTE):
              </Text>
              <Button
                href="https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W?mode=wwc"
                className="bg-green-500 text-white text-base font-semibold px-8 py-3.5 rounded-lg mb-5"
              >
                📲 Unirme al Grupo de WhatsApp
              </Button>

              <Text className="text-gray-800 font-bold text-base mb-2 mt-3">
                Carpeta de recursos:
              </Text>
              <Text className="text-gray-600 text-sm mb-3">
                Estaré trabajando en la ubicación del contenido en esta semana (haremos una mezcla de OneDrive, Notion y/o sitio web)
              </Text>

              <Text className="text-gray-500 text-xs italic mt-4 mb-2">
                Nota: Los enlaces de cada sesión también te llegarán 24 horas y 1 hora antes de cada clase.
              </Text>
            </Section>

            {/* WhatsApp Benefits */}
            <Section className="bg-emerald-50 px-5 py-8">
              <Text className="text-emerald-900 text-2xl font-bold mb-4">
                📲 Únete al Grupo de WhatsApp (Hazlo Ahora)
              </Text>

              <Text className="text-emerald-900 text-sm mb-4">
                El grupo de WhatsApp es donde sucede la magia adicional:
              </Text>

              {[
                'Adelantos de contenido antes de cada módulo',
                'Ejemplos prácticos que puedes probar',
                'Noticias diarias de IA (el mundo cambia rápido)',
                'Dudas rápidas entre sesiones',
                'Red de contadores con tu misma mentalidad'
              ].map((benefit, index) => (
                <Text key={index} className="text-emerald-800 text-sm mb-2">
                  ✅ {benefit}
                </Text>
              ))}

              <Text className="text-emerald-900 text-sm font-semibold mb-5 mt-4">
                El mundo de la IA se mueve TODOS LOS DÍAS. Lo que es cierto hoy puede cambiar mañana. Por eso compartiré actualizaciones constantes en el grupo para que siempre estés al día.
              </Text>

              <Button
                href="https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W?mode=wwc"
                className="bg-green-500 text-white text-base font-bold px-10 py-4 rounded-lg"
              >
                👉 UNIRME AL GRUPO DE WHATSAPP
              </Button>
            </Section>

            {/* What to Expect */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-800 text-2xl font-bold mb-4">
                🎯 Qué Esperar De Aquí Al 14 de Octubre
              </Text>

              <Text className="text-gray-600 text-base mb-5">
                No vamos a esperar hasta el taller para empezar.
              </Text>

              <Text className="text-gray-600 text-sm mb-4">
                Entre hoy y el 14 de octubre te estaré enviando:
              </Text>

              {[
                { title: '1. Adelantos de contenido', desc: 'Pequeñas píldoras de lo que veremos en cada módulo' },
                { title: '2. Casos prácticos adicionales', desc: 'Ejemplos reales que podrás probar antes de la primera sesión' },
                { title: '3. Preparación técnica', desc: 'Cómo tener listas tus cuentas de ChatGPT/Claude/Gemini' },
                { title: '4. Noticias relevantes', desc: 'Si sale algo importante en el mundo IA, lo sabrás inmediatamente' }
              ].map((item, index) => (
                <div key={index} className="mb-4">
                  <Text className="text-gray-800 font-bold text-sm mb-1">{item.title}</Text>
                  <Text className="text-gray-600 text-sm">{item.desc}</Text>
                </div>
              ))}

              <Text className="text-gray-800 text-sm font-semibold italic">
                La idea: Que llegues al primer módulo con contexto y listo para aprovechar al máximo.
              </Text>
            </Section>

            {/* Homework */}
            <Section className="bg-amber-100 px-5 py-8">
              <Text className="text-amber-900 text-2xl font-bold mb-4">
                📝 Tarea Antes Del 14 de Octubre
              </Text>

              <Text className="text-amber-900 text-sm mb-4">
                <em>(Opcional pero recomendada)</em>
              </Text>

              <Text className="text-amber-900 text-sm mb-4">
                Si quieres llegar preparado:
              </Text>

              <Text className="text-amber-900 font-bold text-sm mb-2">
                1. Crea tus cuentas (si no las tienes):
              </Text>
              <Text className="text-amber-900 text-sm mb-1">
                • ChatGPT: <Link href="https://chat.openai.com" className="text-teal-600 font-semibold hover:underline">chat.openai.com</Link>
              </Text>
              <Text className="text-amber-900 text-sm mb-1">
                • Claude: <Link href="https://claude.ai" className="text-teal-600 font-semibold hover:underline">claude.ai</Link>
              </Text>
              <Text className="text-amber-900 text-sm mb-4">
                • Gemini: <Link href="https://gemini.google.com" className="text-teal-600 font-semibold hover:underline">gemini.google.com</Link>
              </Text>
              <Text className="text-amber-900 text-xs italic mb-5">
                Las versiones gratuitas son suficientes para empezar.
              </Text>

              <Text className="text-amber-900 font-bold text-sm mb-2">
                2. Piensa en 3 tareas repetitivas de tu práctica
              </Text>
              <Text className="text-amber-900 text-sm mb-5">
                Esas que te quitan tiempo cada semana. Las vamos a automatizar.
              </Text>

              <Text className="text-amber-900 font-bold text-sm mb-2">
                3. Únete al grupo de WhatsApp
              </Text>
              <Text className="text-amber-900 text-sm">
                Ahí empezaremos a compartir recursos inmediatamente.
              </Text>
            </Section>

            {/* This Week */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-800 text-2xl font-bold mb-4">
                💡 Lo Que Viene Esta Semana
              </Text>

              <Text className="text-gray-800 text-sm mb-2">
                <strong>Mañana:</strong> Te envío el primer adelanto del Módulo 1 (tranqui, que sólo será para ir calentando motores).
              </Text>
              <Text className="text-gray-800 text-sm mb-2">
                <strong>Viernes:</strong> Preparación técnica + primeros recursos
              </Text>
              <Text className="text-gray-800 text-sm">
                <strong>Y en el grupo de WhatsApp:</strong> Actualizaciones un poco mas frecuentes (aunque la magia 🪄 está en colaborar, si sabes de algo interesante, compártelo).
              </Text>
            </Section>

            {/* Questions/Support */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-800 text-2xl font-bold mb-4">
                ❓ ¿Dudas? Estoy Aquí
              </Text>

              <Text className="text-gray-600 text-sm mb-4">
                Si tienes cualquier pregunta antes/después del 14:
              </Text>

              <Text className="text-gray-800 text-sm mb-2">
                📧 <strong>Email:</strong>{' '}
                <Link href="mailto:israel@todoconta.com" className="text-teal-600 font-semibold hover:underline">
                  israel@todoconta.com
                </Link>
              </Text>
              <Text className="text-gray-800 text-sm mb-2">
                📱 <strong>WhatsApp:</strong>{' '}
                <Link href="https://wa.me/5215544753602" className="text-teal-600 font-semibold hover:underline">
                  5544753602
                </Link>
              </Text>
              <Text className="text-gray-800 text-sm mb-4">
                💬 <strong>Grupo:</strong>{' '}
                <Link
                  href="https://chat.whatsapp.com/Hyp3LWigVJF69y3Kpf9Z5W?mode=wwc"
                  className="text-teal-600 font-semibold hover:underline"
                >
                  Link al grupo de WhatsApp
                </Link>
              </Text>

              <Text className="text-gray-500 text-xs italic">
                Respondo en máximo 24 horas (usualmente menos).
              </Text>
            </Section>

            {/* Next Steps */}
            <Section className="bg-blue-100 px-5 py-8">
              <Text className="text-blue-900 text-2xl font-bold mb-4">
                🚀 Lo Que Sigue
              </Text>

              <Text className="text-blue-900 text-base font-semibold mb-4">
                Tu siguiente paso AHORA MISMO:
              </Text>

              {[
                'Guarda las fechas en tu calendario',
                'Únete al grupo de WhatsApp',
                'Revisa la carpeta de recursos',
                '(Opcional) Crea tus cuentas de IA si no las tienes'
              ].map((step, index) => (
                <Text key={index} className="text-blue-900 text-sm mb-2">
                  {index + 1}. ✅ {step}
                </Text>
              ))}
            </Section>

            {/* Closing Message */}
            <Section className="bg-white px-5 py-8">
              <Text className="text-gray-600 text-base mb-4">
                Gracias de nuevo por estar aquí.
              </Text>

              <Text className="text-gray-600 text-base mb-4">
                Nos vemos en el grupo de WhatsApp y el 14 de octubre en la primera sesión.
              </Text>

              <Text className="text-gray-800 text-lg font-semibold mb-6">
                Esto va a estar bueno.
              </Text>

              <Text className="text-gray-600 text-base mb-2">
                Con cariño y números 📊
              </Text>
              <Text className="text-gray-800 text-base font-semibold">
                – Israel Castro
              </Text>
            </Section>

            {/* Premium Note - Conditional rendering example */}
            {isPremium && (
              <Section className="bg-purple-100 px-5 py-7">
                <Text className="text-purple-900 text-sm mb-3">
                  <strong>PD:</strong> Si contrataste el Plan Premium, te contactaré en los próximos días para agendar tu sesión 1-on-1 para que me cuentes sobre tus actividades diarias y ver qué podemos optimizar. Estate atento.
                </Text>

                <Text className="text-purple-900 text-sm">
                  <strong>PPD:</strong> Revisa tu carpeta de spam por si acaso. A veces los correos con muchos links se van ahí. Agrega{' '}
                  <Link href="mailto:israel@todoconta.com" className="text-teal-600 font-semibold hover:underline">
                    israel@todoconta.com
                  </Link>{' '}
                  a tus contactos para evitarlo.
                </Text>
              </Section>
            )}

            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
