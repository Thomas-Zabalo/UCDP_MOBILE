import LegalLayout, { LegalSection } from "./LegalLayout.tsx";

export function RGPDPage() {
  return (
    <LegalLayout title="Confidentialité" parent={"/user"}>
      <LegalSection
        title="01. Collecte des données"
        content="Nous collectons les informations que vous nous fournissez lors de la création de votre profil : nom, prénom, adresse e-mail, numéro de téléphone et localisation. Ces données sont nécessaires au bon fonctionnement de la mise en relation entre clients et prestataires."
      />
      <LegalSection
        title="02. Utilisation"
        content="Vos données servent exclusivement à vous identifier sur la plateforme et à permettre aux autres utilisateurs de vous contacter dans le cadre des missions proposées. Nous ne revendons jamais vos données à des tiers."
      />
      <LegalSection
        title="03. Conservation"
        content="Vos données sont conservées tant que votre compte est actif. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression que vous pouvez exercer depuis votre profil."
      />
    </LegalLayout>
  );
}
