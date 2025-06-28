import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Heading,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface ContactEmailProps {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactEmail({
  name,
  email,
  subject,
  message,
}: ContactEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Nova mensagem de contacto - {subject}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Nova Mensagem de Contacto</Heading>
          <Section style={section}>
            <Text style={label}>Nome:</Text>
            <Text style={content}>{name}</Text>
            <Text style={label}>Email:</Text>
            <Text style={content}>{email}</Text>
            <Text style={label}>Assunto:</Text>
            <Text style={content}>{subject}</Text>
            <Text style={label}>Mensagem:</Text>
            <Text style={content}>{message}</Text>
          </Section>
          <Text style={footer}>
            Esta mensagem foi enviada através do site oficial da Laisher.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: '#f0fdf4', // verde-claro suave
  padding: '20px 0',
  fontFamily: 'Helvetica, Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  borderRadius: '10px',
  padding: '32px',
  margin: '0 auto',
  maxWidth: '600px',
  border: '1px solid #d1fae5',
  boxShadow: '0 10px 20px rgba(0, 0, 0, 0.05)',
};

const heading = {
  fontSize: '24px',
  fontWeight: 'bold' as const,
  marginBottom: '24px',
  color: '#047857', // emerald-700
  textAlign: 'center' as const,
};

const section = {
  marginBottom: '24px',
};

const label = {
  fontSize: '14px',
  fontWeight: 'bold' as const,
  color: '#065f46', // emerald-900
  marginTop: '12px',
};

const content = {
  fontSize: '16px',
  color: '#111827', // zinc-900
};

const footer = {
  fontSize: '13px',
  color: '#10b981', // emerald-500
  textAlign: 'center' as const,
  marginTop: '36px',
};
