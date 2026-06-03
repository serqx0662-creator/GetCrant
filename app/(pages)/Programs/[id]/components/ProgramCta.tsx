"use client";

export default function ProgramCta() {
  const openConsultationModal = () => {
    window.dispatchEvent(new CustomEvent("open-consultation-modal"));
  };

  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
        Заинтересовала программа?
      </h2>
      <p className="text-base text-blue-100 mb-6 max-w-2xl mx-auto">
        Получите персональную консультацию по выбору университета и помощь в подготовке документов
      </p>
      <button
        onClick={openConsultationModal}
        className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold text-base hover:bg-blue-50 transition-colors shadow-lg hover:shadow-xl active:scale-95"
      >
        Получить консультацию
      </button>
    </section>
  );
}
