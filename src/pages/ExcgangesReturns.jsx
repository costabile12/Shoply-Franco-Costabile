import { Container } from "react-bootstrap"

export const ExchangesReturns = () => {
    return(
        <Container className="my-5">
            <h1>Return and Exchange Policy</h1>

            <p>We want you to be fully satisfied with your purchase. If for any reason you are not happy with your order, you may request a return or exchange under the following conditions:</p>

            <hr />

            <h2>1. Timeframes</h2>

            <ul>
                <li><strong>Exchanges:</strong> up to <strong>30 calendar days</strong> from the date of delivery.</li>
                <li><strong>Returns:</strong> up to <strong>10 calendar days</strong> from the date of delivery, in accordance with consumer protection laws.</li>
            </ul>

            <hr />

            <h2>2. General Conditions</h2>

            <ul>
                <li>Items must be in <strong>perfect condition</strong>, unused, and returned with their <strong>original packaging, tags, and all included accessories.</strong></li>
                <li> Proof of purchase (invoice or order number) is required.</li>
                <li>Shipping costs for returns or exchanges are the responsibility of the customer, unless the item arrived defective or incorrect.</li>
            </ul>

            <hr />

            <h2>3. Category-Specific Rules</h2>

            <section className="ms-5 mt-4 mb-3" aria-labelledby="electronics">
                <h3>Electronics</h3>

                <ul> 
                    <li>Returns are accepted only if the product has a <strong>manufacturing defect</strong> or arrives damaged/incomplete.</li>
                    <li>Returns will not be accepted for issues related to <strong>compatibility</strong> with the customer’s other devices.</li> 
                    <li>Items must be returned with <strong>security seals intact</strong> and with all accessories (chargers, cables, manuals, etc.).</li> 
                </ul>

            </section>

            <section className="ms-5 mb-3"  aria-labelledby="clothing">
                <h3 id="clothing">Men’s &amp; Women’s Clothing</h3>

                <ul> 
                    <li>Exchanges are accepted for <strong>size, color, or model</strong>, provided the item has not been worn or washed.</li> 
                    <li>Garments must include all <strong>original tags</strong>.</li> 
                </ul> 
            </section> 
            
            <section className="ms-5  mb-3"  aria-labelledby="jewelry"> 
                <h3 id="jewelry">Jewelry</h3>
                
                <ul> 
                    <li>For hygiene and safety reasons, <strong>earrings cannot be returned or exchanged</strong>.</li> 
                    <li>Other jewelry items can only be returned if they arrive <strong>defective</strong> or incorrect.</li>  
                </ul> 
            </section> 
            
            <h2>4. Refunds</h2> 
            <ul> 
                <li>Refunds will be issued to the <strong>original payment method</strong> used at checkout.</li> 
                <li>Processing times may vary depending on your bank or payment provider, and may take <strong>5–10 business days</strong>.</li> 
            </ul> 
            
            <h2>5. Process</h2> 
            
                <ol class="steps"> 
                    <li>Contact our <strong>Customer Service Team</strong> with your order details and the reason for the return or exchange.</li>
                    <li>You will receive instructions for returning the item.</li> 
                    <li>Once the product is received and inspected, we will process the exchange, store credit, or refund as applicable.</li>
                </ol> <p class="note"><strong>Important:</strong> We reserve the right to decline returns or exchanges that do not meet these conditions.</p>


        </Container>
    )
}