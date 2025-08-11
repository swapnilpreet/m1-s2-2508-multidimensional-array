import { BasicSubscription } from "./BasicSubscription";
import { CertificateAddon } from "./CertificateAddon";
import { DoubtSupportAddon } from "./DoubtSupportAddon";
import { mentorAccessAddon } from "./MentorAccessAddon";
import { PromotionalBundleDiscountAddon } from "./PromotionalBundleDiscountAddon";

function main(): void {
  let newsubscription1 = new CertificateAddon(new BasicSubscription());
  console.log(newsubscription1.getCost());
  console.log(newsubscription1.getFeatures());

  let newsubscription2 = new PromotionalBundleDiscountAddon(
    new CertificateAddon(
      new mentorAccessAddon(new DoubtSupportAddon(new BasicSubscription()))
    )
  );

  console.log(newsubscription2.getCost());
  console.log(newsubscription2.getFeatures());
}

main();
