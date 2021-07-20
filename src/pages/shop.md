---
layout: base
title: Shop
permalink: ./shop/index.html
metaDescription: Nimm Dir ein Andenken aus dem Museumsshop mit.
eleventyNavigation:
  key: Shop
  order: 3
---

## Museumsshop

Du hast die Ausstellung besucht und möchtest Dir ein Andenken mitnehmen? Genau dafür ist dieser Shop gedacht.

Wir nutzen PayPal zur Abwicklung der Bestellungen. Falls Du nicht möchtest, dass Deine Daten dorthin übertragen werden, kannst Du im INTRO Café am Kronenplatz vorbeigehen.

{% include "partials/components/products-list.njk" %}

- - -

### Warenkorb

Die Kaufabwicklung erfolgt direkt über PayPal. Sobald Du ein Produkt in den Warenkorb gelegt hast und wieder hierher gekommen bist, kannst Du über diesen Button zum Warenkorb navigieren.

<form target="paypal" action="https://www.paypal.com/cgi-bin/webscr" method="post">
  <input type="hidden" name="business" value="daniel@achteintel.org">
  <input type="hidden" name="cmd" value="_cart">
  <input type="hidden" name="display" value="1">
  <input class="button" type="submit" name="submit" value="Warenkorb anzeigen">
</form>

