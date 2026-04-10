/**
 * SVG Stipple Filter Component
 * Creates a high-contrast dot-matrix effect for images
 * Must be placed at the root of the app to be accessible via CSS filter: url(#stipple)
 */
const StippleFilter = () => {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Stipple/Dot-Matrix Filter */}
        <filter id="stipple" x="0%" y="0%" width="100%" height="100%">
          {/* Convert to grayscale */}
          <feColorMatrix
            type="matrix"
            values="0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0.33 0.33 0.33 0 0
                    0 0 0 1 0"
            result="grayscale"
          />

          {/* Increase contrast */}
          <feComponentTransfer result="highContrast">
            <feFuncR type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
            <feFuncG type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
            <feFuncB type="discrete" tableValues="0 0.2 0.4 0.6 0.8 1" />
          </feComponentTransfer>

          {/* Create dot pattern with turbulence */}
          <feTurbulence
            type="turbulence"
            baseFrequency="0.8"
            numOctaves="1"
            result="turbulence"
          />

          {/* Use turbulence as displacement for stipple effect */}
          <feDisplacementMap
            in="highContrast"
            in2="turbulence"
            scale="2"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />

          {/* Apply colorize with purple-blue gradient approximation */}
          <feColorMatrix
            type="matrix"
            values="0.5 0 0 0 0.48
                    0 0.3 0 0 0.15
                    0 0 0.8 0 0.92
                    0 0 0 1 0"
            result="colored"
          />

          {/* Blend original with colored version */}
          <feBlend
            in="highContrast"
            in2="colored"
            mode="multiply"
          />
        </filter>

        {/* Alternative: Simpler stipple filter */}
        <filter id="stipple-simple" x="-10%" y="-10%" width="120%" height="120%">
          {/* Halftone effect */}
          <feColorMatrix
            type="matrix"
            values="0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0.2126 0.7152 0.0722 0 0
                    0 0 0 1 0"
          />
          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.5 1" />
            <feFuncG type="discrete" tableValues="0 0.5 1" />
            <feFuncB type="discrete" tableValues="0 0.5 1" />
          </feComponentTransfer>
        </filter>

        {/* Pointillism/Dot effect filter */}
        <filter id="dots" x="-20%" y="-20%" width="140%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.5"
            numOctaves="2"
            result="noise"
          />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="1 0 0 0 0
                    0 1 0 0 0
                    0 0 1 0 0
                    0 0 0 20 -10"
            result="dots"
          />
          <feComposite
            in="SourceGraphic"
            in2="dots"
            operator="in"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default StippleFilter;