export const styles = {
  body: {
    margin: 0,
    padding: 0,
    fontFamily: "'Inter', sans-serif", /* Using Inter as per instructions */
    backgroundColor: '#DAE0E6', /* Reddit-like light grey background */
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    color: '#1A1A1B',
    WebkitFontSmoothing: 'antialiased', /* For smoother font rendering on WebKit browsers */
    MozOsxFontSmoothing: 'grayscale',   /* For smoother font rendering on Firefox for macOS */
  },
  container: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', /* Soft shadow for depth */
    width: '100%',
    maxWidth: '400px', /* Standard width for auth forms */
    boxSizing: 'border-box', /* Include padding and border in the element's total width and height */
    textAlign: 'center',
    position: 'relative', /* For positioning message box */
  },
  h1: {
    fontSize: '20px',
    fontWeight: '700',
    marginBottom: '24px',
    color: '#000000', /* Darker text for headings */
  },
  socialButton: {
    width: '100%',
    padding: '12px 16px',
    marginBottom: '12px',
    border: '1px solid #D7DADC',
    borderRadius: '4px',
    backgroundColor: '#FFFFFF',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    transition: 'background-color 0.2s ease', /* Smooth transition on hover */
    boxShadow: '0 1px 2px rgba(0, 0, 0, 0.05)', /* Subtle inner shadow */
  },
  socialButtonHover: {
    backgroundColor: '#F8F8F8', /* Lighter background on hover */
  },
  socialIcon: {
    width: '20px',
    height: '20px',
    verticalAlign: 'middle',
  },
  separator: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    margin: '24px 0',
    color: '#878A8C', /* Grey color for separator text */
    fontSize: '12px',
  },
  separatorLine: {
    content: '""', /* Required for ::before/::after pseudo-elements */
    flex: 1,
    borderBottom: '1px solid #EDEFF1', /* Light grey line */
  },
  inputGroup: {
    marginBottom: '16px',
    textAlign: 'left',
  },
  inputLabel: {
    display: 'block',
    marginBottom: '4px',
    fontSize: '13px',
    color: '#878A8C',
  },
  inputField: {
    width: '100%',
    padding: '12px',
    border: '1px solid #D7DADC',
    borderRadius: '4px',
    fontSize: '14px',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s ease', /* Smooth transition on focus */
  },
  inputFieldFocus: {
    outline: 'none',
    borderColor: '#0079D3', /* Reddit blue on focus */
    boxShadow: '0 0 0 1px #0079D3', /* Blue outline on focus */
  },
  formButton: {
    width: '100%',
    padding: '12px',
    backgroundColor: '#FF4500', /* Reddit orange */
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease', /* Smooth transition on hover */
  },
  formButtonHover: {
    backgroundColor: '#E03E00', /* Slightly darker orange on hover */
  },
  agreementText: {
    fontSize: '12px',
    color: '#878A8C',
    marginTop: '16px',
    lineHeight: '1.5',
  },
  agreementLink: {
    color: '#0079D3',
    textDecoration: 'none',
  },
  agreementLinkHover: {
    textDecoration: 'underline',
  },
  toggleLinkContainer: {
    marginTop: '20px',
    fontSize: '13px',
    color: '#1A1A1B',
  },
  toggleLink: {
    color: '#0079D3',
    textDecoration: 'none',
    fontWeight: '700',
    cursor: 'pointer',
  },
  toggleLinkHover: {
    textDecoration: 'underline',
  },
  messageBox: {
    padding: '10px',
    borderRadius: '4px',
    marginBottom: '15px',
    fontSize: '14px',
    textAlign: 'left',
  },
  homePageContainer: {
    backgroundColor: '#FFFFFF',
    padding: '24px',
    borderRadius: '8px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '600px', /* Wider for home page content */
    boxSizing: 'border-box',
    textAlign: 'center',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '200px',
  },
  logoutButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#0079D3', /* Reddit blue for logout */
    color: '#FFFFFF',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
  },
  logoutButtonHover: {
    backgroundColor: '#005BB3', /* Darker blue on hover */
  }
};

// Helper function to apply hover styles dynamically
export const applyHoverStyle = (elementStyles, hoverStyles, isHovered) => {
  return isHovered ? { ...elementStyles, ...hoverStyles } : elementStyles;
};
