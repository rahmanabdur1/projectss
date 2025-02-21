"use client";
import dynamic from "next/dynamic";
import { FaEnvelope } from "react-icons/fa";
import { useState, useMemo } from "react";
import { toast } from "react-toastify";

const IntlTelInput = dynamic(() => import("intl-tel-input/reactWithUtils"), {
  ssr: false,
});

const Form = () => {
  const [formData, setFormData] = useState({
    email: "",
    message: "",
    whatsapp: "", 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);


  const isValidEmail = useMemo(() => (email) => {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (number) => {
    setFormData((prevData) => ({ ...prevData, whatsapp: number }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { email, message, whatsapp } = formData;
    const form_data = { fullPhoneNumber: whatsapp, email, message };

    if (whatsapp.length < 7) {
      setIsSubmitting(false);
      toast.error("CELULAR INCOMPLETO Invalid Phone Number 无效电话 هاتف غير صالح");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("CORREO EQUIVOCADO Invalid eMail 错误的电子邮件 بريد إلكتروني خاطئ");
      setIsSubmitting(false);
      return;
    }

    if (message.trim().length < 30) {
      toast.error("ESCRIBE UN POCO MÁS Write a bit more 多写一点 اكتب أكثر من ذلك بقليل");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://contact.avimex.co/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form_data),
      });

      const result = await response.json();

      if (result.status) {
        toast.success(result.message);
        setFormData({ email: "", message: "", whatsapp: "" });
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-black px-8 lg:px-20 py-10 w-full md:w-[500px]">
      <div>
        <FaEnvelope className="m-auto text-4xl text-white" />
      </div>
      <form className="flex flex-col items-center mail_form" onSubmit={handleSubmit}>
        <label className="my-3 text-white text-sm">WHATSAPP*</label>
        <div className="w-full">
          <IntlTelInput
            name="whatsapp"
            value={formData.whatsapp}
            onChangeNumber={handlePhoneChange} 
            initOptions={{ initialCountry: "it" }}
          />
        </div>

        <label className="my-3 text-white text-sm">E-MAIL*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full"
          required
        />

        <label className="my-3 text-white text-sm">MENSAJE *</label>
        <textarea
          name="message"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          className="w-full"
          required
        ></textarea>

        <button
          type="submit"
          className="bg-transparent text-white text-sm border p-2 px-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Enviando..." : "Enviar"}
        </button>
      </form>
    </div>
  );
};

export default Form;
