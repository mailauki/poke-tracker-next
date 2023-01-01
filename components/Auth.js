import { Auth as SupaAuth } from '@supabase/auth-ui-react'
import { useSupabaseClient } from '@supabase/auth-helpers-react'
import { useAppContext } from '../context/AppContext'

export default function Auth() {
  const supabase = useSupabaseClient()
  const { theme } = useAppContext()

  const authTheme = {
    dark: {
      "colors": {
        "brand": "#90caf9",
        "brandAccent": "#90caf9",
        "brandButtonText": "rgba(0, 0, 0, 0.87)",
        "defaultButtonBackground": "#2e2e2e",
        "defaultButtonBackgroundHover": "#3e3e3e",
        "defaultButtonBorder": "#3e3e3e",
        "defaultButtonText": "white",
        "dividerBackground": "#2e2e2e",
        "inputBackground": "black",
        "inputBorder": "#3e3e3e",
        "inputBorderHover": "gray",
        "inputBorderFocus": "gray",
        "inputText": "white",
        "inputPlaceholder": "darkgray"
      }
    },
    default: {
      "colors": {
        "brand": "#1976d2",
        "brandAccent": "#1976d2",
        "brandButtonText": "white",
        "defaultButtonBackground": "white",
        "defaultButtonBackgroundHover": "#eaeaea",
        "defaultButtonBorder": "lightgray",
        "defaultButtonText": "gray",
        "dividerBackground": "#eaeaea",
        "inputBackground": "transparent",
        "inputBorder": "lightgray",
        "inputBorderHover": "gray",
        "inputBorderFocus": "gray",
        "inputText": "black",
        "inputLabelText": "gray",
        "inputPlaceholder": "darkgray",
        "messageText": "gray",
        "messageTextDanger": "red",
        "anchorTextColor": "gray",
        "anchorTextHoverColor": "darkgray"
      },
      "space": {
          "spaceSmall": "4px",
          "spaceMedium": "8px",
          "spaceLarge": "16px",
          "labelBottomMargin": "8px",
          "anchorBottomMargin": "4px",
          "emailInputSpacing": "4px",
          "socialAuthSpacing": "4px",
          "buttonPadding": "16.5px 14px",
          "inputPadding": "16.5px 14px"
      },
      "fontSizes": {
          "baseBodySize": "13px",
          "baseInputSize": "14px",
          "baseLabelSize": "14px",
          "baseButtonSize": "14px"
      },
      "fonts": {
          "bodyFontFamily": "ui-sans-serif, sans-serif",
          "buttonFontFamily": "ui-sans-serif, sans-serif",
          "inputFontFamily": "ui-sans-serif, sans-serif",
          "labelFontFamily": "ui-sans-serif, sans-serif"
      },
      "borderWidths": {
          "buttonBorderWidth": "1px",
          "inputBorderWidth": "1px"
      },
      "radii": {
          "borderRadiusButton": "4px",
          "buttonBorderRadius": "4px",
          "inputBorderRadius": "4px"
      }
    }
  }

  return (
    <SupaAuth supabaseClient={supabase} appearance={{ theme: authTheme }} theme={theme.palette.mode} />
  )
}