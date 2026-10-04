import { describe, expect, it } from "vitest";

import { legalContent } from "@/content/legal";

describe("legal content", () => {
  it("states the formation status without draft or training-qualification notices", () => {
    expect(legalContent.de.legalNotice.sections).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: "anbieterin",
          facts: expect.arrayContaining([
            expect.objectContaining({
              label: "Unternehmensform",
              value: "Einzelunternehmen in Gründung",
            }),
          ]),
        }),
        expect.objectContaining({
          id: "gewerbe",
          facts: [
            { label: "Gewerbeanmeldung", value: "In Gründung" },
          ],
        }),
      ]),
    );

    const legalNotices = JSON.stringify([
      legalContent.de.legalNotice,
      legalContent.en.legalNotice,
    ]);
    expect(legalNotices).not.toMatch(
      /vorläufig|entwurf|ausbildung|preliminary|draft|professional training/i,
    );
  });

  it("describes the active privacy services without public pending markers", () => {
    const privacyNotices = JSON.stringify([
      legalContent.de.privacy,
      legalContent.en.privacy,
    ]);

    expect(privacyNotices).toContain("Vercel Web Analytics");
    expect(privacyNotices).toContain("FormSubmit");
    expect(privacyNotices).not.toMatch(
      /vorläufig|entwurf|noch offen|preliminary|draft|still pending/i,
    );
    expect(privacyNotices).not.toContain('"pending"');
  });
});
