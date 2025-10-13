import { Container } from "react-bootstrap";

export const Shipping = () => {
    return(
        <Container className="my-5">
            <h1>Shipping Policy</h1>
            
            <p>We aim to deliver your orders quickly and safely. Below you will find our shipping terms and conditions:</p>

            <hr />

            <h2>1. Processing Time</h2>

            <ul> 
                <li>Orders are processed within <strong>1–3 business days</strong> after payment confirmation.</li> 
                <li>Orders placed on weekends or holidays will be processed the next business day.</li> 
            </ul> 

            <h2>2. Shipping Methods &amp; Delivery Times</h2>

            <ul> 
                <li><strong>Standard Shipping:</strong> 5–10 business days (depending on destination).</li> 
                <li><strong>Express Shipping:</strong> 2–5 business days.</li> 
                <li>Delivery times may vary based on courier services and external factors (weather, customs delays, etc.).</li> 
            </ul> 

            <h2>3. Shipping Costs</h2> 
            
            <ul> 
                <li>Shipping costs are calculated at checkout based on the delivery address and chosen shipping method.</li> 
                <li>We offer <strong>free shipping</strong> on orders over a specified purchase amount (check current promotions).</li> 
            </ul> 
            
            <h2>4. Order Tracking</h2> 
                <ul> 
                    <li>Once your order is shipped, you will receive a confirmation email with a <strong>tracking number</strong>.</li> 
                    <li>You can track your order directly on the courier’s website.</li> 
                </ul> 
                
            <h2>5. Shipping Restrictions</h2> 
            
                <ul> 
                    <li>We currently ship to most regions, but some remote areas may have limited coverage.</li>
                    <li>We do not ship to P.O. Boxes or military addresses at this time.</li> 
                </ul> 

            <h2>6. Damaged or Lost Packages</h2>

            <ul> 
                <li>If your order arrives damaged, please contact our <strong>Customer Service Team</strong> within 48 hours of delivery with photos of the product and packaging.</li>
                <li>If your package is lost in transit, we will work with the courier to resolve the issue and arrange a replacement or refund.</li> 
            </ul> 
            
            <p><strong>Important:</strong> Delivery times are estimates and may be affected by external factors beyond our control.</p>
        </Container>
    );
}