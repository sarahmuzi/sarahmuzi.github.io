(function () {
    let tmpl = document.createElement('template');
    tmpl.innerHTML = '\
        <form id="form">\
            <table style="width: 100%;">\
            <tr>\
                <td style="width: 55%;">Background Color</td>\
                <td><input id="aps_bgcolor" type="color" name="backgroundColor"></td>\
            </tr>\
            <tr>\
                <td>Graph Color</td>\
                <td><input id="aps_graphcolor" type="color" name="graphColor"></td>\
            </tr>\
            <tr>\
                <td>Text Color</td>\
                <td><input id="aps_textcolor" type="color" name="textColor"></td>\
            </tr>\
            <tr>\
                <td>Root Height</td>\
                <td><input id="aps_root" type="number" name="rootHeight" size="10" maxlength="10"></td>\
            </tr>\
            <tr>\
                <td>Column Width</td>\
                <td><input id="aps_column" type="number" name="columnWidth" size="10" maxlength="10"></td>\
            </tr>\
            <tr>\
                <td>Padding</td>\
                <td><input id="aps_padding" type="number" name="padding" size="10" maxlength="10"></td>\
            </tr>\
            <tr>\
                <td>Direction</td>\
                <td>\
                    <input type="radio" name="direction" value="ltr" id="aps_ltr"><label for="aps_ltr">ltr</label>\
                    <input type="radio" name="direction" value="rtl" id="aps_rtl"><label for="aps_rtl">rtl</label>\
                </td>\
            </tr>\
            </table>\
        </form>\
    ';

    class SankeyTreeChartPropertySheet extends HTMLElement {
        constructor() {
            super();
            this._shadowRoot = this.attachShadow({ mode: 'open' });
            this._shadowRoot.appendChild(tmpl.content.cloneNode(true));
            // this._shadowRoot.getElementById("form").addEventListener("submit", this._submit.bind(this));
            this._shadowRoot.querySelectorAll("#form input").forEach(elem => {
                elem.addEventListener("change", this._submit.bind(this));
            });
            this._shadowRoot.querySelectorAll("#form textarea").forEach(elem => {
                elem.addEventListener("change", e => {
                    e.preventDefault();
                    this.dispatchEvent(new CustomEvent('propertiesChanged', {
                        "detail": {
                            "properties": {
                                [e.target.name]: JSON.parse(e.target.value)
                            }
                        }
                    }));
                    return false;
                });
            });
        }

        _submit(e) {
            e.preventDefault();
            this.dispatchEvent(new CustomEvent('propertiesChanged', {
                "detail": {
                    "properties": {
                        [e.target.name]: e.target.value
                    }
                }
            }));
            return false;
        }

        set backgroundColor(v) {
            this._shadowRoot.getElementById("aps_bgcolor").value = v;
        }

        set graphColor(v) {
            this._shadowRoot.getElementById("aps_graphcolor").value = v;
        }

        set rootHeight(v) {
            this._shadowRoot.getElementById("aps_root").value = v;
        }

        set padding(v) {
            this._shadowRoot.getElementById("aps_padding").value = v;
        }

        set columnWidth(v) {
            this._shadowRoot.getElementById("aps_column").value = v;
        }

        set textColor(v) {
            this._shadowRoot.getElementById("aps_textcolor").value = v;
        }

        set direction(v) {
            this._shadowRoot.getElementById("aps_ltr").checked = v !== "rtl";
            this._shadowRoot.getElementById("aps_rtl").checked = v === "rtl";
        }

    }

    customElements.define('sdk-stc-aps', SankeyTreeChartPropertySheet);
})();