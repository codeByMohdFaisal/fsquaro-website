"use client";

import { ArrowRight, CheckCircle2 } from "lucide-react";
import { type FormEvent, useState } from "react";

const contactEmail = "fsquaro.business@gmail.com";

export default function ContactForm() {
  const [isPrepared, setIsPrepared] = useState(false);

  function prepareEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const topic = String(formData.get("topic") ?? "General question").trim();
    const message = String(formData.get("message") ?? "").trim();
    const subject = "FSquaro website enquiry: " + topic;
    const body = [
      "Name: " + name,
      "Email: " + email,
      "Topic: " + topic,
      "",
      "Message:",
      message,
    ].join("\n");

    setIsPrepared(true);
    window.location.href =
      "mailto:" + contactEmail + "?" + new URLSearchParams({ subject, body }).toString();
  }

  return (
    <form className="contact-form" onSubmit={prepareEmail}>
      <div className="contact-form-fields">
        <div className="form-field">
          <label htmlFor="contact-name">Your name</label>
          <input id="contact-name" name="name" type="text" autoComplete="name" required />
        </div>
        <div className="form-field">
          <label htmlFor="contact-email">Email address</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
          />
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-topic">What can we help with?</label>
          <select id="contact-topic" name="topic" defaultValue="Product question">
            <option>Product question</option>
            <option>Business or partnership enquiry</option>
            <option>Catalogue feedback</option>
            <option>General question</option>
          </select>
        </div>
        <div className="form-field form-field-full">
          <label htmlFor="contact-message">Your message</label>
          <textarea id="contact-message" name="message" rows={6} required />
        </div>
      </div>

      <button className="button button-primary" type="submit">
        Prepare email <ArrowRight size={17} aria-hidden="true" />
      </button>
      <p className="contact-form-note">
        Submitting opens your email app with the message addressed to FSquaro. Review it
        and press Send from your email app.
      </p>
      {isPrepared ? (
        <p className="contact-form-status" role="status">
          <CheckCircle2 size={17} aria-hidden="true" /> Your email app should now be
          ready with your message.
        </p>
      ) : null}
    </form>
  );
}
