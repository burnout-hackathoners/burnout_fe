import "react-tooltip/dist/react-tooltip.css";

import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import UserBadgesWidget from "./Badges.tsx";
import { integrationsData } from "./integrationsData.ts";
import "./index.css";

const queryClient = new QueryClient();

export function renderIfIdExists(elementId: string, children: ReactNode) {
  const element = document.getElementById(elementId);

  if (element) {
    ReactDOM.createRoot(element as HTMLElement).render(children);
  }
}

function waitForElement(selector: string, cb: VoidFunction) {
  let isPresent = false;

  const observer = new MutationObserver(() => {
    const newIsPresent = !!document.querySelector(selector);

    if (isPresent !== newIsPresent) {
      isPresent = newIsPresent;

      if (newIsPresent) {
        cb();
      }
    }
  });

  observer.observe(document.getElementById("react-application")!, {
    childList: true,
    subtree: true,
  });
}

function renderBadges() {
  const re = /^\/[^/]+\/users\/[^/]+/i;

  waitForElement(
    "#user-profile > div.Profile__ProfileWrapper-sc-a2b9328-2.bvMEhB > div.Profile__ProfileRightBlockWrapper-sc-a2b9328-3.iyxvGn > section",
    () => {
      if (re.test(window.location.pathname)) {
        const groupResponsibilities = document.querySelector(
          "#group-responsibilities",
        );

        if (groupResponsibilities) {
          const element = document.createElement("div");
          element.id = "group-burnout-badges";
          element.className =
            "Surface__StyledSurface-sc-d7491f6a-0 jSxRQq styles__StyledProfileSurface-sc-cf7cff64-3 fzCEFz";

          groupResponsibilities.parentElement?.insertBefore(
            element,
            groupResponsibilities,
          );

          renderIfIdExists(
            "group-burnout-badges",
            <React.StrictMode>
              <QueryClientProvider client={queryClient}>
                <UserBadgesWidget />
              </QueryClientProvider>
            </React.StrictMode>,
          );
        }
      }
    },
  );
}

function renderIntegrations() {
  function renderIntegration(
    title: string,
    description: string,
    image: string,
  ) {
    return `
      <a class="RouterLink__StyledRouterLink-sc-e19cb4cc-0 bstMak styles__CardRouterLink-sc-a0ec6c34-2 jcurUZ" href="/qa-team/settings/integrations/adp_workforce_now">
        <div class="Card__StyledCard-sc-a8d0451f-0 fBxUXn styles__StyledCard-sc-a0ec6c34-0 hHAVuY">
          <div class="styles__CardLogoWrapper-sc-a0ec6c34-3 iCmWRg">
            <img alt="ADP Workforce Now" class="styles__StyledCardLogo-sc-a0ec6c34-4 kceQNi" src="${image}">
          </div>
          <div class="styles__CardBody-sc-a0ec6c34-5 jexlmB">
            <h4 class="styles__CardTitle-sc-a0ec6c34-6 HTOsJ">${title}</h4>
            <p class="styles__CardDescription-sc-a0ec6c34-7 lavQkG">${description}</p>
            <span class="styles__CardReadMore-sc-a0ec6c34-8 echzOB">Read more</span>
            <div class="Checkmark__StyledCheckmark-sc-d64cb1e2-0 iXQNCZ styles__StyledCheckmark-sc-a0ec6c34-9 jVpJBG">
                <span class="Checkmark__StyledCheckmarkIcon-sc-d64cb1e2-1 hPsHRA"><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" class="svg-inline--fa fa-check Icon__StyledFontAwesomeIcon-sc-480c5e3d-0 pCUAp" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" style="--fa-primary-color: #2A2A2A; --fa-secondary-color: #E3E3E3; --fa-secondary-opacity: 1;"><path fill="currentColor" d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"></path></svg></span>
                <span class="Checkmark__StyledCheckmarkText-sc-d64cb1e2-2 lhdddf">Connected</span>
            </div>
          </div>
        </div>
      </a>`;
  }

  function injectIntegration(
    parent: Element,
    title: string,
    description: string,
    image: string,
  ) {
    const element = document.createElement("div");
    element.className = "Column__StyledColumn-sc-fb7e041e-0 dzyfRJ";
    element.innerHTML = renderIntegration(title, description, image);

    parent.insertBefore(element, parent.firstChild);
  }

  const re = /^\/[^/]+\/settings\/integrations/i;

  waitForElement(
    "#main-body-wrapper > div > div > div > div > div:nth-child(4)",
    () => {
      if (re.test(window.location.pathname)) {
        const parent = document.querySelector(
          "#main-body-wrapper > div > div > div > div > div:nth-child(4)",
        );

        if (parent) {
          integrationsData.forEach(
            (integration: {
              title: string;
              description: string;
              logoUrl: string;
            }) => {
              injectIntegration(
                parent,
                integration.title,
                integration.description,
                integration.logoUrl,
              );
            },
          );
        }
      }
    },
  );
}

renderIntegrations();

renderBadges();
