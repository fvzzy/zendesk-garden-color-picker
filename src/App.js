import { useState } from 'react';
import styled from 'styled-components';
import { Field, Label, Range, Input } from '@zendeskgarden/react-forms';
import { ButtonGroup, Button } from '@zendeskgarden/react-buttons';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row, Table } from '@zendeskgarden/react-tables';
import { Paragraph, Span } from '@zendeskgarden/react-typography';
import { Well, Title as WellTitle, Alert } from '@zendeskgarden/react-notifications';
import { DEFAULT_THEME, PALETTE, getColor } from '@zendeskgarden/react-theming';
import rgb2hex from 'rgb2hex';
import { ratio, score } from 'wcag-color';

const Container = styled.div`
  display: flex;
  justify-content: center;
  padding: ${props => props.theme.space.xl};
`

const InnerContainer = styled.div`
  max-width: 700px;
  padding: ${props => props.theme.space.xl};
  border: ${props => `${props.theme.borders.sm} ${PALETTE.grey[200]}`};
`

const ColorPickerGroup = styled.div`
  margin-bottom: ${props => props.theme.space.lg};
`

const HueField = styled.div`
  margin-bottom: ${props => props.theme.space.md};
`

const ShadeField = styled(Field)`
  margin-bottom: ${props => props.theme.space.md};
`

const StyledButtonGroup = styled(ButtonGroup)`
  min-width: 100%;
`

const BlockLabel = styled(Label)`
  display: block;
  margin-bottom: ${props => props.theme.space.xs};
`

const ComputerColorsTable = styled(Table)`
  margin-bottom: ${props => props.theme.space.lg};
`

const ExampleWell = styled(Well)`
  margin-bottom: ${props => props.theme.space.lg};
  color: ${props => props.foreground};
  background-color: ${props => props.background};
`

const ExampleTitle = styled(WellTitle)`
  color: ${props => props.color};
`

const ColouredButton = styled(Button)`
  color: ${props => getColor(props.value, 800, DEFAULT_THEME, 1)};
  background-color: ${props => getColor(props.value, 400, DEFAULT_THEME, 1)};
  border-color: ${props => getColor(props.value, 600, DEFAULT_THEME, 1)};

 &:hover, &:active {
    color: ${props => getColor(props.value, 300, DEFAULT_THEME, 1)};
    background-color: ${props => getColor(props.value, 600, DEFAULT_THEME, 1)};
    border-color: ${props => getColor(props.value, 800, DEFAULT_THEME, 1)};
  }
`

function App() {
  const colorRgba = (hue, shade) => getColor(hue, shade, DEFAULT_THEME, 1);
  const hues = [ 'grey', 'blue', 'red', 'yellow', 'green', 'kale' ];

  const [bgHue, setBgHue] = useState('white');
  const [bgShade, setBgShade] = useState(500);
  const [fgHue, setFgHue] = useState('black');
  const [fgShade, setFgShade] = useState(500);

  const bgRgba = colorRgba(bgHue, bgShade);
  const bgHex = rgb2hex(bgRgba).hex;
  const fgRgba = colorRgba(fgHue, fgShade);
  const fgHex = rgb2hex(fgRgba).hex;

  const contrastRatio = ratio(fgHex, bgHex);
  const contrastScore = score(fgHex, bgHex);
  const getContrastDescription = score => {
    if (score === 'AAA') {
      return 'This is enhanced contrast, suitable for longer articles that will be read for a significant period of time.';
    } else if (score === 'AA') {
      return 'This is the sweet spot for text sizes below approximately 18px.';
    } else if (score === 'AA Large') {
      return 'This is the smallest acceptable amount of contrast for type sizes of 18px and larger.';
    } else if (score === 'Fail') {
      return 'Your text doesn\'t have enough contrast with the background.';
    }
    return null;
  }
  const getAlertType = score => {
    if (score === 'AAA' || score === 'AA') {
      return 'success'
    } else if (score === 'Fail') {
      return 'error'
    }
    return 'info'
  }

  return (
    <Container>
      <InnerContainer>
        <ColorPickerGroup>
          <HueField>
            <BlockLabel>Background Hue</BlockLabel>
            <StyledButtonGroup selectedItem={bgHue} onSelect={setBgHue}>
              {hues.map(hue => <ColouredButton key={hue} value={hue} isStretched>{hue}</ColouredButton>)}
            </StyledButtonGroup>
          </HueField>
          <ShadeField>
            <Label>Background Shade</Label>
            <Input type='number' value={bgShade} onChange={e => setBgShade(e.target.value)} />
            <Range step={0.1} value={bgShade / 10} onChange={e => setBgShade(e.target.value * 10)} />
          </ShadeField>
        </ColorPickerGroup>

        <ColorPickerGroup>
          <HueField>
            <BlockLabel>Foreground Hue</BlockLabel>
            <StyledButtonGroup selectedItem={fgHue} onSelect={setFgHue}>
              {hues.map(hue => <ColouredButton key={hue} value={hue} isStretched>{hue}</ColouredButton>)}
            </StyledButtonGroup>
          </HueField>
          <ShadeField>
            <Label>Foreground Shade</Label>
            <Input type='number' value={fgShade} onChange={e => setFgShade(e.target.value)} />
            <Range step={0.1} value={fgShade / 10} onChange={e => setFgShade(e.target.value * 10)} />
          </ShadeField>
        </ColorPickerGroup>

        <ComputerColorsTable>
          <Head>
            <HeaderRow>
              <HeaderCell>Computed Colors</HeaderCell>
              <HeaderCell>RGBa</HeaderCell>
              <HeaderCell>HEX</HeaderCell>
            </HeaderRow>
          </Head>
          <Body>
            <Row>
              <Cell>Background</Cell>
              <Cell>{bgRgba}</Cell>
              <Cell>{bgHex}</Cell>
            </Row>
            <Row>
              <Cell>Foreground</Cell>
              <Cell>{fgRgba}</Cell>
              <Cell>{fgHex}</Cell>
            </Row>
          </Body>
        </ComputerColorsTable>

        <ExampleWell foreground={fgRgba} background={bgRgba}>
          <ExampleTitle color={fgRgba}>Example Color Output</ExampleTitle>
          <Paragraph>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis auctor metus sapien, et fermentum eros congue sit amet. Pellentesque porttitor tristique porta.
          </Paragraph>
          <Paragraph>
             Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean quis velit vel eros volutpat porttitor nec et felis. Fusce nec sagittis dolor.
          </Paragraph>
        </ExampleWell>

        <Alert type={getAlertType(contrastScore)}>
          <Paragraph>The example above has a contrast ratio of <Span isBold>{contrastRatio}</Span>, and a WCAG contrast score of <Span isBold>{contrastScore}</Span>.</Paragraph>
          <Paragraph>{getContrastDescription(contrastScore)}</Paragraph>
        </Alert>
      </InnerContainer>
    </Container>
  );
}

export default App;
