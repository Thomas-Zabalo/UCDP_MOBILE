import LegalLayout, { LegalSection } from "./LegalLayout.tsx";

export function TermsPage() {
  return (
    <LegalLayout title="Conditions Générales" parent={"/user"}>
      <LegalSection
        title="Article 1. Objet"
        content="La plateforme UCDP (nom à adapter) est un outil de mise en relation. Elle n'intervient pas dans les contrats privés passés entre les clients et les prestataires de service."
      />
      <LegalSection
        title="Article 2. Responsabilité"
        content="L'utilisateur est seul responsable de la véracité des informations transmises sur son profil. La plateforme ne saurait être tenue responsable de la qualité des prestations fournies ou des annulations de dernière minute."
      />
      <LegalSection
        title="Article 3. Paiements"
        content="Si des transactions financières sont effectuées via l'application, elles sont sécurisées par notre partenaire de paiement. Tout litige financier doit être réglé directement entre les parties concernées."
      />
    </LegalLayout>
  );
}
