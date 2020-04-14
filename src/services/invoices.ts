import { mockInvoiceWithComplianceHashes } from '../data/travelRuleData'
import {
  Invoice,
  PaymentInformation,
  Compliance,
  ComplianceType,
} from '../types/publicAPI'

/**
 * Generates an Invoice containing receiver payment details, along with the Compliance requirements
 * that the sender must comply with. If the compliance data is included, the data is hashed and sent
 * back to the sender as part of the Invoice as confirmation that the data was received and processed
 * successfully.
 *
 * @param nonce Used to correlate invoices/compliance/receipts
 * @param payId PayID of the user receiving funds
 * @param paymentInformation Payment details (e.g. Crypto, ACH) of the user receiving funds
 * @param complianceData Compliance data of sender to satisfy any legal requirements
 * @returns A valid Invoice to be sent to the client
 */
export default function generateInvoice(
  nonce: string,
  payId: string,
  paymentInformation: PaymentInformation,
  complianceData?: Compliance,
): Invoice {
  // TODO(dino): Store whether a server needs to be travel rule compliant in the env
  // TODO(dino): Actually hash the compliance data
  // TODO(dino): Consider caching this invoice, or atleast caching the compliance hashes
  // to retrieve for multiple compliance round trips. This won't be necessary for the foreseeable future,
  // and maybe never for our reference implementation (currently no plans to include any requirements
  // other than travel rule), so maybe this should be deleted.
  // TODO(dino): figure out where this hardcoded value should live or if it should be in a database
  const TIME_TO_EXPIRY = 60 * 60 * 1000
  const invoice: Invoice = {
    nonce,
    expirationTime: Date.now() + TIME_TO_EXPIRY,
    paymentInformation: {
      ...paymentInformation,
      payId,
    },
    complianceRequirements: [ComplianceType.TravelRule],
    complianceHashes: [],
  }

  if (complianceData) {
    return mockInvoiceWithComplianceHashes
  }
  return invoice
}
