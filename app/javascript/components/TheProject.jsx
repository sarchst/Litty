import { useState, useEffect } from 'react'
import { translations } from '../translations'

export default function TheProject() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  return (
    <div 
      style={{ 
        width: "100%",
        minHeight: "100%",
        backgroundColor: "white",
        padding: isMobile ? "32px 16px 80px 16px" : "32px 16px 80px 32px",
        boxSizing: "border-box"
      }}
    >
      <div 
        style={{ 
          width: "100%",
          minHeight: "100%",
          maxWidth: "1920px",
          maxHeight: "1080px",
          padding: isMobile ? "0 16px 16px 16px" : "0 16px 16px 32px",
          backgroundColor: "white",
          margin: "0 auto",
          position: "relative",
          boxSizing: "border-box"
        }}
      >
        <div style={{
          position: "absolute",
          top: "0",
          left: "0",
          width: "100%",
          boxSizing: "border-box"
        }}>
          <h1 
            className="tk-new-spirit"
            style={{
              textAlign: "center",
              fontFamily: '"New Spirit", "new-spirit", "Playfair Display", serif',
              fontSize: isMobile ? "48px" : "64px",
              fontWeight: 600,
              color: "var(--Off-Black, #474747)",
              margin: "0 0 48px 0",
              padding: "0",
              lineHeight: "1"
            }}
          >
            LITTY
          </h1>
        <div style={{
          width: "100%",
          maxWidth: "608px",
          height: isMobile ? "auto" : "750px",
          margin: "0 auto 80px auto",
          paddingLeft: isMobile ? "0" : "16px",
          paddingRight: isMobile ? "0" : "16px",
          fontFamily: '"Neue Haas Grotesk Text Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          fontSize: isMobile ? "16px" : "18px",
          fontWeight: 400,
          color: "var(--Off-Black, #474747)",
          lineHeight: "1.6",
          boxSizing: "border-box",
          wordWrap: "break-word",
          overflowWrap: "break-word"
        }}>
          <p style={{ margin: "0 0 1rem 0" }}>
            This project has been supported by countless lists, rankings, and recommendations compiled by critics, editors, and readers across the literary world.
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            www.litty.ca
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            Text copyright © litty 2025<br />
            Design copyright © litty 2025
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            The moral right of the creators has been asserted.
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            All rights reserved. No part of this website may be reproduced or transmitted in any form or by any means, electronic or mechanical, including downloading, scraping, or archiving without prior permission in writing from the publisher.
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            A digital anthology of aggregated literary acclaim.<br />
            Website: litty.ca<br />
            Instagram: @read.litty<br />
            ISSN 978–0-0404–0000-0
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            First Edition: December 2025
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            Books – Rankings – Fiction and Nonfiction.<br />
            Critics – Reviews – Aggregation.<br />
            Reading – Modern canon – Recommendations.
          </p>
          <p style={{ margin: "0 0 1rem 0" }}>
            Printed metaphorically, not literally.
          </p>
          <p style={{ margin: "0" }}>
            Typography inspired by timeless serif traditions, adapted for the web.
          </p>
        </div>
        </div>
      </div>
    </div>
  )
}
