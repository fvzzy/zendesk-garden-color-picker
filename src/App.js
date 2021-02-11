import { useState } from 'react';
import styled from 'styled-components';
import { Field, Hint, Label, Range } from '@zendeskgarden/react-forms';
import { ButtonGroup, Button } from '@zendeskgarden/react-buttons';
import { Body, Cell, Head, HeaderCell, HeaderRow, Row, Table } from '@zendeskgarden/react-tables';
import { Well, Title as WellTitle, Paragraph } from '@zendeskgarden/react-notifications';
import { DEFAULT_THEME, PALETTE, getColor } from '@zendeskgarden/react-theming';
import rgb2hex from 'rgb2hex';

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const InnerContainer = styled.div`
  max-width: 700px;
  padding: ${props => props.theme.space.lg};
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
  width: 100%;
`

const BlockLabel = styled(Label)`
  display: block;
  margin-bottom: ${props => props.theme.space.xs};
`

const ComputerColorsTable = styled(Table)`
  margin-bottom: ${props => props.theme.space.lg};
`

const ExampleWell = styled(Well)`
  color: ${props => props.foreground};
  background-color: ${props => props.background};
`

const ExampleTitle = styled(WellTitle)`
  color: ${props => props.color};
`

function App() {
  const colorRgba = (hue, shade) => getColor(hue, shade, DEFAULT_THEME, 1);
  const hues = [ 'white', 'grey', 'blue', 'red', 'yellow', 'green', 'kale', 'black' ];

  const [bgHue, setBgHue] = useState('white');
  const [bgShade, setBgShade] = useState(400);
  const [fgHue, setFgHue] = useState('black');
  const [fgShade, setFgShade] = useState(400);

  const bgRgba = colorRgba(bgHue, bgShade);
  const bgHex = rgb2hex(bgRgba).hex;
  const fgRgba = colorRgba(fgHue, fgShade);
  const fgHex = rgb2hex(fgRgba).hex;

  return (
    <Container>
      <InnerContainer>
        <ColorPickerGroup>
          <HueField>
            <BlockLabel>Background Hue</BlockLabel>
            <StyledButtonGroup selectedItem={bgHue} onSelect={setBgHue}>
              {hues.map(hue => <Button key={hue} value={hue} isPrimary isStretched>{hue}</Button>)}
            </StyledButtonGroup>
          </HueField>
          <ShadeField>
            <Label>Background Shade</Label>
            <Hint>{bgShade}</Hint>
            <Range step={0.125} onChange={e => setBgShade(e.target.value * 8)} />
          </ShadeField>
        </ColorPickerGroup>

        <ColorPickerGroup>
          <HueField>
            <BlockLabel>Foreground Hue</BlockLabel>
            <StyledButtonGroup selectedItem={fgHue} onSelect={setFgHue}>
              {hues.map(hue => <Button key={hue} value={hue} isPrimary isStretched>{hue}</Button>)}
            </StyledButtonGroup>
          </HueField>
          <ShadeField>
            <Label>Foreground Shade</Label>
            <Hint>{fgShade}</Hint>
            <Range step={0.125} onChange={e => setFgShade(e.target.value * 8)} />
          </ShadeField>
        </ColorPickerGroup>

        <ComputerColorsTable size='large'>
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
          <ExampleTitle color={fgRgba}>What is a Garden?</ExampleTitle>
          <Paragraph>
            Turnip greens yarrow endive cauliflower sea lettuce kohlrabi amaranth water. Corn amaranth
            salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.
          </Paragraph>
          <Paragraph>
            Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic. Corn
            amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke. Turnip
            greens yarrow endive cauliflower sea lettuce kohlrabi amaranth water.
          </Paragraph>
        </ExampleWell>
      </InnerContainer>
    </Container>
  );
}

export default App;
