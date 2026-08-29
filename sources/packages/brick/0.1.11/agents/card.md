# Card agent guide

## Purpose

Group content about one subject in a finished static compound surface with header, content, and footer anatomy.

## Use when

- A bounded subject needs a title, supporting content, and optional actions as one visual unit.

## Choose something else when

- Only generic background, border, radius, or elevation is needed. Use Surface.

## Required composition

- Compose Card.Root with only the Header, Title, Description, Action, Content, and Footer parts the subject needs.
- Card.Action reserves a trailing Header column across the title and description rows; when compact metadata belongs beside only the title, compose that title row with HStack and omit Card.Action so the description retains the full measure.

## Rules

- **MUST:** Do not turn the whole Card into an unnamed clickable div; place explicit Link or Button controls inside or use a valid link composition.
- **MUST:** Load styles.css or core.css plus card.css and styles for nested components.
- **SHOULD:** Use bordered={false} when edge-to-edge authored media should meet Card's clipped outer boundary without retaining the selected recipe's border; do not remove that geometry with application CSS.
- **SHOULD:** Use Card.Action only when every Header text row should reserve its trailing column; otherwise compose title-only metadata in a Brick HStack.
- **SHOULD:** For edge media, place authored Image directly under Card.Root, then use Card.Header for topic, title, and description so the root clips outer corners and the complete text region receives Card inset.

## Common mistakes

- **Avoid:** Using Card for every spacing group. **Instead:** Use Stack or Surface when there is no bounded card subject.
- **Avoid:** Using Card.Action for a title-only Badge and unintentionally narrowing the description below it. **Instead:** Place the title and Badge in a Brick HStack, then render Card.Description as the next full-width Header child.
- **Avoid:** Placing Card.Content directly after edge media and expecting top inset. **Instead:** Use Card.Header for the introductory text anatomy.

## Validation checklist

- Check heading order and explicit action names.
- Check whether trailing Header content should constrain both title and description or the title row only.
- Check content flow, focus visibility, narrow widths, and appearance contrast.

## Related guidance

- `surface`
- `stack`
- `grid`
- `button`
- `link`
