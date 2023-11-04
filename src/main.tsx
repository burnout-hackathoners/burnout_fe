import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import UserBadgesWidget from "./Badges.tsx";

const queryClient = new QueryClient();

export function renderIfIdExists(elementId: string, children: ReactNode) {
  const element = document.getElementById(elementId);

  if (element) {
    ReactDOM.createRoot(element as HTMLElement).render(children);
  }
}

function waitForElm(selector: string) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
}

async function renderBadges() {
  const re = /^\/[^/]+\/users\/[^/]+/i;

  if (re.test(window.location.pathname)) {
    await waitForElm(
      "#user-profile > div.Profile__ProfileWrapper-sc-a2b9328-2.bvMEhB > div.Profile__ProfileRightBlockWrapper-sc-a2b9328-3.iyxvGn > section"
    );

    const groupResponsibilities = document.querySelector(
      "#group-responsibilities"
    );

    if (groupResponsibilities) {
      var element = document.createElement("div");
      element.id = "group-burnout-badges";
      element.className =
        "Surface__StyledSurface-sc-d7491f6a-0 jSxRQq styles__StyledProfileSurface-sc-cf7cff64-3 fzCEFz";

      groupResponsibilities.parentElement?.insertBefore(
        element,
        groupResponsibilities
      );

      renderIfIdExists(
        "group-burnout-badges",
        <React.StrictMode>
          <QueryClientProvider client={queryClient}>
            <UserBadgesWidget />
          </QueryClientProvider>
        </React.StrictMode>
      );
    }
  }
}

async function renderIntegrations() {
  function renderIntegration(
    title: string,
    description: string,
    image: string
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
    image: string
  ) {
    var element = document.createElement("div");
    element.className = "Column__StyledColumn-sc-fb7e041e-0 dzyfRJ";
    element.innerHTML = renderIntegration(title, description, image);

    parent.insertBefore(element, parent.firstChild);
  }

  const re = /^\/[^/]+\/settings\/integrations/i;

  if (re.test(window.location.pathname)) {
    await waitForElm(
      "#main-body-wrapper > div > div > div > div > div:nth-child(4)"
    );

    const parent = document.querySelector(
      "#main-body-wrapper > div > div > div > div > div:nth-child(4)"
    );

    if (parent) {
      injectIntegration(
        parent,
        "Pluralsight",
        "Develop critical tech skills. Cut cycle times. Build happier, healthier tech teams. And innovate smarter using AI. All with Pluralsight.",
        "https://www.pluralsight.com/content/dam/ps-nav-assets/product-logo/logo-icon/skills-icon.png"
      );

      injectIntegration(
        parent,
        "Udemy",
        "Choose from over 210,000 online video courses with new additions published every month",
        "https://www.udemy.com/staticx/udemy/images/v7/logo-udemy.svg"
      );

      injectIntegration(
        parent,
        "Coursera",
        "Unlimited access to 7,000+ world-class courses, hands-on projects, and job-ready certificate programs—all included in your subscription",
        "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjIuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPgo8c3ZnIHZpZXdCb3g9IjAgMCAxMTU1IDE2NCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLW1pdGVybGltaXQ9IjIiPjxwYXRoIGQ9Ik0xNTkuNzUgODEuNTRjMC00NC40OSAzNi42My04MC40NyA4Mi40My04MC40NyA0Ni4xMiAwIDgyLjc2IDM2IDgyLjc2IDgwLjQ3IDAgNDQuMTYtMzYuNjQgODAuOC04Mi43NiA4MC44LTQ1LjggMC04Mi40My0zNi42OC04Mi40My04MC44em0xMjUuNjEgMGMwLTIyLjI0LTE5LjMtNDEuODctNDMuMTgtNDEuODctMjMuNTUgMC00Mi44NSAxOS42My00Mi44NSA0MS44NyAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yIDIzLjkyIDAgNDMuMTgtMTkuNjMgNDMuMTgtNDIuMnptNzA1LjYzIDEuMzFjMC00OC43NCAzOS41OC04MS43OCA3NS41Ny04MS43OCAyNC41MyAwIDM4LjYgNy41MiA0OC4wOCAyMS45MmwzLjc3LTE5aDM2Ljc5djE1NS40aC0zNi43OWwtNC43NS0xNmMtMTAuNzkgMTEuNzgtMjQuMjEgMTktNDcuMSAxOS0zNS4zMy0uMDUtNzUuNTctMzEuMTMtNzUuNTctNzkuNTR6bTEyNS42MS0uMzNjLS4wOS0yMy41MjctMTkuNDctNDIuODM1LTQzLTQyLjgzNS0yMy41OSAwLTQzIDE5LjQxMS00MyA0M3YuMTY1YzAgMjEuNTkgMTkuMyA0MC44OSA0Mi44NiA0MC44OSAyMy44NSAwIDQzLjE0LTE5LjMgNDMuMTQtNDEuMjJ6TTk0NS43OCAyMlY0aC00MC4yM3YxNTUuMzloNDAuMjNWNzUuNjZjMC0yNS4xOSAxMi40NC0zOC4yNyAzNC0zOC4yNyAxLjQzIDAgMi43OS4xIDQuMTIuMjNMOTkxLjM2LjExYy0yMC45Ny4xMS0zNi4xNyA3LjMtNDUuNTggMjEuODl6bS00MDQuMjcuMDF2LTE4bC00MC4yMy4wOS4zNCAxNTUuMzcgNDAuMjMtLjA5LS4yMi04My43MmMtLjA2LTI1LjE4IDEyLjM1LTM4LjI5IDMzLjkzLTM4LjM0IDEuMzc2LjAwNCAyLjc1Mi4wODEgNC4xMi4yM0w1ODcuMSAwYy0yMSAuMTctMzYuMjIgNy4zOS00NS41OSAyMi4wMXpNMzM4Ljg4IDk5LjJWNC4wMWg0MC4yMlY5NC4zYzAgMTkuOTUgMTEuMTIgMzEuNzMgMzAuNDIgMzEuNzMgMjEuNTkgMCAzNC0xMy4wOSAzNC0zOC4yOFY0LjAxaDQwLjI0djE1NS4zOGgtNDAuMjF2LTE4Yy05LjQ4IDE0LjcyLTI0Ljg2IDIxLjkyLTQ2LjEyIDIxLjkyLTM1Ljk4LjAxLTU4LjU1LTI2LjE2LTU4LjU1LTY0LjExem0zOTEuNzQtMTcuNDhjLjA5LTQzLjUxIDMxLjIzLTgwLjc0IDgwLjYyLTgwLjY1IDQ1LjguMDkgNzguMTEgMzYuNzggNzggODAgLjAxIDQuMjczLS4zMyA4LjU0LTEgMTIuNzZsLTExOC40MS0uMjJjNC41NCAxOC42NSAxOS44OSAzMi4wOSA0My4xMiAzMi4xNCAxNC4wNiAwIDI5LjEyLTUuMTggMzguMy0xNi45NGwyNy40NCAyMmMtMTQuMTEgMTkuOTMtMzkgMzEuNjYtNjUuNDggMzEuNjEtNDYuNzUtLjE2LTgyLjY3LTM1LjIzLTgyLjU5LTgwLjd6bTExOC4xMi0xNi4xNGMtMi4yNi0xNS43LTE4LjU5LTI3Ljg0LTM3Ljg5LTI3Ljg3LTE4LjY1IDAtMzMuNzEgMTEuMDYtMzkuNjMgMjcuNzNsNzcuNTIuMTR6bS0yNjEuNCA1OS45NGwzNS43Ni0xOC43MmM1LjkxIDEyLjgxIDE3LjczIDIwLjM2IDM0LjQ4IDIwLjM2IDE1LjQzIDAgMjEuMzQtNC45MiAyMS4zNC0xMS44MiAwLTI1LTg0LjcxLTkuODUtODQuNzEtNjcgMC0zMS41MiAyNy41OC00OC4yNiA2MS43Mi00OC4yNiAyNS45NCAwIDQ4LjkyIDExLjQ5IDYxLjQgMzIuODNsLTM1LjQ0IDE4Ljc1Yy01LjI1LTEwLjUxLTE1LjEtMTYuNDItMjcuNTgtMTYuNDItMTIuMTQgMC0xOC4wNiA0LjI3LTE4LjA2IDExLjQ5IDAgMjQuMyA4NC43MSA4Ljg3IDg0LjcxIDY3IDAgMzAuMjEtMjQuNjIgNDguNTktNjQuMzUgNDguNTktMzMuODItLjAzLTU3LjQ2LTExLjE5LTY5LjI3LTM2Ljh6TTAgODEuNTRDMCAzNi43MyAzNi42My43NCA4Mi40My43NGMyNy45NDctLjE5NiA1NC4xODIgMTMuNzM3IDY5LjY3IDM3bC0zNC4zNCAxOS45MmE0Mi45NzIgNDIuOTcyIDAgMDAtMzUuMzMtMTguMzJjLTIzLjU1IDAtNDIuODUgMTkuNjMtNDIuODUgNDIuMiAwIDIyLjU3IDE5LjMgNDIuMiA0Mi44NSA0Mi4yYTQyLjUwMiA0Mi41MDIgMCAwMDM2LjMxLTIwbDM0IDIwLjI4Yy0xNS4zMDcgMjMuOTU1LTQxLjkwMiAzOC40MzEtNzAuMzMgMzguMjhDMzYuNjMgMTYyLjM0IDAgMTI1LjY2IDAgODEuNTR6IiBmaWxsPSIjMDA1NkQyIiBmaWxsLXJ1bGU9Im5vbnplcm8iLz48L3N2Zz4="
      );

      injectIntegration(
        parent,
        "Burnout Express",
        "Want to burn out at work faster? Burnout Express is the service that helps you achieve this goal in record time.",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAP4AAABFCAYAAABqm1vnAAAAAXNSR0IArs4c6QAAAIRlWElmTU0AKgAAAAgABQESAAMAAAABAAEAAAEaAAUAAAABAAAASgEbAAUAAAABAAAAUgEoAAMAAAABAAIAAIdpAAQAAAABAAAAWgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAAP6gAwAEAAAAAQAAAEUAAAAAv9E4OgAAAAlwSFlzAAALEwAACxMBAJqcGAAAAVlpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IlhNUCBDb3JlIDYuMC4wIj4KICAgPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4KICAgICAgPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIKICAgICAgICAgICAgeG1sbnM6dGlmZj0iaHR0cDovL25zLmFkb2JlLmNvbS90aWZmLzEuMC8iPgogICAgICAgICA8dGlmZjpPcmllbnRhdGlvbj4xPC90aWZmOk9yaWVudGF0aW9uPgogICAgICA8L3JkZjpEZXNjcmlwdGlvbj4KICAgPC9yZGY6UkRGPgo8L3g6eG1wbWV0YT4KGV7hBwAAQABJREFUeAHtnQt8V9WV79fJA/6EAAGCBAjwB4JGBY0S26io2FqlHdvqVGp7x/n0YaetWu1gO7e9nTudzrTO47bFGa32OnZaO7VTK53Rqp1itTO2RUUBDQ8lSCD/vF//PAlJyON/7ve3z/+ECORJgrf3umDlvPZea+2119p77cc5f7O34W0NvK2B/+804P1/V+IJL7CfE5D06iac9Gkl6MqRBss+s9/3spxWxQ1idjpsIeQRsh1fXami34Zxa8BVQoTs6NGPcuz+/XQaP3eNWeYOu19lsULzs3aadVCWKl2PDMcbo3IMNsjw+eB7I1Od3BQTLZOjl4nMsgUdpb8J7Awcfflrpu/s7P4ssyXdY6+rQKtv9/iBHsb518/daBbZZNfnmnVFNtuW0g8Hzj9KhxkP2wEDUGZ6Z8GpGJijl+Xb+QVmu9dCTEaL/Pf9zLNbW6Ed43oY8Cm7RWg4ZJQOaDQkV4hpPItczvXdweMJdoiA6Nj+Opklr5DG+lSjHD+HMmbtsPVRs+35ZjNbN1vZ1om1BT/6KPJusPMLqSfQFGmqoaaurnvcs8dinI+643nb8dHW2MA5irLIaGh9r6cCHr9K52bRYs/KtnEuh6njOMEQVr4amkPw/UwJzklli18IJ+MrmU92X3n8HAwqc4N5n7JZto5S5FqDlVjvtGc963ycBMOUxekCHdyRbfaTArMEhpiCPAvJc1fxnXZtX9AoOv3wLLt0szU+e6JDODrSJ43FUHJK1okAx4uG7o4ssxfQy9fQ4bXIPFIDNxxvP4odRLGD60jFUTqLPoctbOV8Ahq6UObCfLOd6yyDoGyhFdlsqMdx9jJ7hHr8Bs6sctRxd0SQsk8zuELAc3QCnmbhRmDnZM/EUWyDM/YnqYgYiLO4hiCWxzO19JMArleJbLC5682a1+GkOdZ2W8y3v3zuTpwpZHi3+ZIHY3M9bng7gmFIxkGO5cqi+qcXeUrHCE1ZpqVynMJZ7zSMaHB6rk4CQU8vp48X8TgLhEc8bvaxnE12UYnZ05L1KptreVYX37uh08tBlkeOkQqHGU9x69puL5Afx5k0+0gLQuV7r4UhDdb7Czaa/zB6Q67x8PRziPrQ3+Pr0Fu+zcAWmqyUKkDngvHQDHIO/ouegXJkRMfTwBnuTDcjOD7luINn98R0YzRwmh3fGZsUAt/hxsQDRjnIUE9WnMHpTvZ8YpQeUA5kD3q3e9dzL4pB5+MqOZh6H65WZUesasObHe5kQo33XmSH66WaC221XetcrBxnqojHN9mybhqgKISzNrne5slHgl7MsYrI0DdjIEGD5PSehrHaJtd4qdcrU95MStFtbRajHBjuH23jHnSHB4XwOHoOvVCezbcC6ydPhW1l6BMzq1VDkGVz0NN8F5auskO2A96E/U6fIs7cwsAww3yL7giiJqSeIKcRkwCCOjRbtpbrAtwllx6zeJPdn3m33arGcjzAUE8RD9TSKWO71XEeM/toMUd0czyE5T6ZbQ737Dg6XVzTvBKdVfG39E67R1ejhtPo+K5QCo1zzYqjZnNb77QdezEAzgeHKKPtAQaPrxdj2EHBA8d7ivH2tX0fPoH2UHoZncI1Vg1CWpw+h1BrMcYu05bJVPDMOYxreVX5EwguHKeuaHDmYrDiqZqTkznjck5fYIsIAVswus73W9CLWbJ3W5+PXnCqM1s5AHL2nYWcUBfOIY3eSlRFTaUBr06mdXeH+pO2KYgWsm0eusiBVoujh8GvjJldAe7usMM0JP2uJ9xrNq2Osf6A3QW9L2PWDMqVzv22GHLez5DpVtKE9SL2J3MU3T8eXJ6QftLxjuX1nbyxtbbMDWsCR+15An1oPmMwv+PphtfHaCn9IJtQ/VeRCgfMLjHL7+YcexHNMI+jz73BHV9I1+ktKffxPmEWNLAaSrl0Zj3U0WGw2p5jjP8UOqWsIZ8BmkOehAoaMsHEPHAFZly1rIjGcB0VnGu9MXoqr3STXcdY8jEcRS28pREqh+FslOsO325/yrN7pMRBoDGVZjVv+zg3o2DHBrsXGq6FzeRI+Gp1vt3HpMfxFXq8co5NTu1kNpu84gUeny5UfibP4oE80p5yCPsw+wZk6VX4f49kmSBwoSRj8LnXQrCAcR30gVqwWj3rnBihfzaOk21T6bXV66BD9WIXu15MeopzryxK2J3NM0mrdLk2E5k9JO91ZTbneJ1OhyT55xxC76o3Gy63B8DJBd0PX8etqKVAU03GYWf85LsipsZ4g72w1eJM9zmDncMYv+kpzuWQ0h54fZRjJvJnYgK6R/19n3uuB046ru6f6AykPQ78qMJuld2sBNmubi0kOKJepRPVGfc/psazyDVSIXUiE2d9TsanlBa4VlGS5GFYF+hE13QmedwSLVeGHe7cOWRrcH8aWiACsi+u9+2Zbdg2t33RUZSFbOr4KqmDT6KfIMoIhlq/4p4a5Gz4uklix5t8AvKJXzNpkEkN5FG0rUYeOze7GRQMbmSCO0P9HUx8qDSneD+c8WRsmtF8g52L0lG/M5JDVmJNjxOKPvU9QtNMjReTY9gim07VuB5UylAr6hoPJwuNA3Lf9ila7Y9j7hGedlsztKSQqdw5yp24USffLKBCi9Wa30meoKdRJYTLVGpABPOuCiorGwX+4Dlk4d4xfi6J46mzs0gTq0PdJa6XkwZVHTJ6GW/bTBnFRAJOvD6PSi+wpehuNqRbwUP2LP62hShgm9ntRdYZy+GeDABdTSPFM1kbWO45JgiNQ9DDZ3KMOGdvogzHjDjCuZ7JoDnfmo+eqxgeqIQng2SI25Xt5gQ64d1D2gYNEwJHCTJ9MnYs89dK/h56qmc1BdCH19Z8TnNcfWvI5Hg3yRE5lxOqAVrM2P8elXpQebgagLBjSU5+Kex2+e+t22FrthXajhLxC2g257nGU6VFU8gMn91F2MRarlR+ocrcisOL5wBwTUd0zVbPtsS4qRpPU2Owwc1l1NaZtUM1VsB96quL57LtO7bQESC3GuBv8izGM9HfWbjBbhMv7jtQ2ciTXcpRCAzYIOmVPwm9yOyji04nH8++Rl1du5e6gv9AHhKf2HmFJMg0WTAgAMscGddZTtfH7WIUsgp+08Ay8DC9V5NClQoUpEIsQ/kY+CwpzgHyleGc98eC0C9Q9gYrXEXVroVWxFVxjGMmvaFAYx+Nt50SFQLflg+qxezYZNfQAqvSnGyKLqDvfRyjW+soNcVR+IezNlrnz2gkUKIzANKYYayMiTWDr+UaB6r4IFUfR3Fss2132q4dnKkSJwCcnMgBz+n0qmdQWplKAybbYzvuZNYYObGBa59j9R39qVeXg+OMmmyyQyVBuE2iwBlJ44yFoxq5pWA2su6nXNKV06Y4wDMe3eB6zlspneQYbESB/ui5SIcR9lDeNP5NIf8Z3KmWS31v3QZ7oxgDj0Ir16Wzr9Eafwd+tVlmy+HdJT6rXIO2kLzSaCOO0CNZlq1LOglpsksftXu0GsC5401CyRPoB9vR9U00/EXEMUVugrKFRq1JjX8TvEJwzpPpajW8tQi7SSXPfPiiNadfPVN9VtCYqVdVh6IJtXbK1fl02FHJLhhOKkrdUhpM9t57Hba7lg6hgLKUkpuycs/ulYUIkN9xyIaXhomr3CRdG6kPyQ9sr+YGoKn0YR43mWym4Qh5M2gkZ2ILgrnQb4dm787sDTaP1Rm3YhKWF97H15vL5f5I+AmCsEKcWkO6jDG1ttlVRO+c59x5AewQyeFh10O1mj2Qj3MWcHcV49RVKDkXY2qFUsSaFN7cluNbyeOFdo99ySlk5zoUt4pUZqKnopaCqqxGKhsH5Ay6KEm9nGape8TrabX6LN+4CmBIoUkllJgFymgFTV1Vm2hYNtli8mvJTK34XM57Oe7OJ4XSZSNnkeOLibuAa489zNr3QzgipRvsJDwfMwzoUj1GFs6cTznXOn7SXaNKO4ehkjOONEUzm1iWoudX2jxScFT5D0QDB1OvewnlF9xTlyx/n3pePAOKd5D2BdA1HFESKT/l/X50jd3qestjDseToEHkoBDz8W4apSwcPjcpXy7aXmflXZnoW/oScC633gnN0Khr4EFIPAWrmIM+9URl0/AjruFMTOVIC+7Gu7V+7bN8qfAYxwBc6I990QnYzhtsOWHa3KTbtvA4GHLEFBHR24tyCK3oD13BQ9FTDv9kR8LFoEqOJmw72MIzdSIaPsnhtOLRyZEIa6Ndq0ZX8tHjq45w8LnIsBy6Kksj5eoid5u7EkXK7yDLlqCfpXCSVvSkwf2NQVfD2jruSF7RTi4X/7aAeo0iQyF5i1xj0cfTqfBSI9BMg9EWr9tAZOibW42xO+2xqqR8JDwRRHwCIGh5IRRhHCOR7LcIHjipehPuqShh8Q9zXgVWKwxXekKt+SjtTAoRuJ/uZqGqLKukcKVSwr3dO+wF0u9URLDWLiDnRaDSi1Yc3AUH5/TnbUs6aRbKyuKJQjqlRIJCwv8d0FFl7cZoqJhuOMnxZ1H9fSi3bSdV4salqhoqLCbqAo2l89wa6jKuRFm899hTTLA8FMwnDAwjVG5gLI1AoEcckhl8SBLCIcc6DEq9SKDZKqTtVFPTDH3vU5tMY8r5GEssSgo5UtQZ6hHpVfAehjluLNkxyBDII6fXMt4n1jsHdBFAs0qUgx5ktEQVO2lF58FnbYnoBBNgoqkQXGvfFdJPBD3kOcfJ5oq7GHQ2jfd6KOyFTitDNvEjvwN4CjQOhtc86ldcRUkSq0FXT6iosBeUA7eAnaqr25gzuK3KtzXFGiOb/WWRpcdvoMbWUeqAt+qjFb496j01xyM5nVRG/XT79sA2a9qtXj+C40ff5PSiEcohiSV/m7PRHJwsy+XJIE9nrGCTnd+9yUUtxeSKFVKSq2xlUg8hx0bn9LqKq6F2dSbdLoKWyiyNKKqoti3BJhw3QS0tSEeD94jkoJdC6K+CT6An5aUWKFkEx1d6cGc02EuxLMa1NJG0Ac6OA2WYKKB30pZPhSSaTFIPo5lNN+atshqMNY7S1KqG4kxHzUdQfY5z5CgmEBRGSienMxel1ZCgxRWsiN4hynJWHsMGN5Jy6aSEGFihce91jwdG+hfI0dwROAl81CsdkdpoOGw91F3IrmruQB41MRGn1A4UXAsmHHeF71XBuiwp1TAsIIw7m/MoKBlLQSZYNtPCckTaN+0K0zU8Bzt/2JsPvudo6I90mKWJIaKkXK5zcfo816o3ctWFkTTKoNFFBjrTnEJXF6WPGb1AYJxqYjtcJEXdKpR+Rkt8DjYx1+ElzUWNC06/jroq4iFpk46YRwOsOlLZGjHmDoY/ffTqnY+jp9tUM2pE4SnDigay6B4UnCFKo1B2dXwYc407A6zjjlCQDSqFyhBF7lx3pSe6K95KgdYcjSqex0FxVkhcSVvUu5OnOyVDLq6wjhoJ8uBacjHCOkkDaILvTUCp7ipm7T7f6nFoObOarRCUWrgPVMnisqdrwKeL6JUzkS3YONMI/bbdpNwtLWW5YVgm9SSuuiNZW0A3hzKtJFjhqMrhjho6LSMGoDqttm00CqS5uY5OUx2mNEgh1THBVyVLR08LKOkqdxU0GC4V1ypvDTK0ibsmGWe2qlGkkcf2hoakgoZOMLYnzyCsHEo9h3pMhR0yPgqjMaC4SWBhFGzFeNtQxFLukMv1aooGVBjEH4AlpF4OBpQ0t61ALYAYB4VlB5wLlh7rmZ5AmXog/ox5ndOHEoQyuuuI6+HySCqa4is+rciE9KgvnPnuc0ainkjPZ4OCKLjfVm3oPL9wje0qvpwcwcztwM46KIbO7nJKC1TKiQ0CFc+zv1iHvKtw+GAGX6nV6yk87XGaibhhxkKMPknJUZUxSd4DYKtrBlXxWcFY/2k9AR6IPcochMalwXVyeUgTqXIWrcNfwJPVwVN4StK8Aal1W0YdA19HlvLYs5wJ+gb0FsoU3Ndf8Raq1nPgUegcrt9R0gz1sbqWxCqHGlbVha5LwVpQNlEFjaPI08B5LxzVEKsuhDNApc8BO8it1Yr4vQwF8h8KIjEnA9J9TZTRC9fqKNSo1BI+q8zKL9gB7pfTr9lqtqWE+YYc642tIprKTNZ7IR1KBzLUufRHkEVDzC64qzHRMmuNazrIuzKWjCxXEaZrGTEYVkgjyq0hRGdzVKsjm2w6tpKpJ0Asyp8o+ihwTi+plTcHlJxKpWMZ2Eq6ZpqF3mbuLIslIzzOT9q5kGHAANz5BPzRMoUK4aovggEHNFVBMlQ9EQqSxeOoLTDBWF1OXwruATWpoim7mdBSNeWCUHQYjutFQ8oTBvMFGJdmTktKzK1Zn7ktWI/WUsn31iGPjA9oFjXNRudQkXluvKU7ofGIj0ChpiDoQfqoUK2dHjPUqB4CdRjOi7tLCYvhk+w5AydmnffWLTuDKsIIFSJ/JyrZmK9oHbTMlIbTM0t+fqHTX7qTK981hCpjLRzcHAWaUI8sx5DO+sBWUM6mazmH4MjAGfJIe12iAu5mXuN6epbHqogCuHaNcjBxleHqJwL9Y42qaIp2Pqihhs5VfrSK9rKpq4+4epS+xEmghkEyyVmlLzmLhlnaJ6CJt/lci46bxON5BxS6XK0G+xIyk+eiqXSD6110U8mvMbfHUbPb4leXTMuBu4GNRVz/iE5uYyb+VlaNjJUCRaQ7r0JXV7k6rcc5OymFZGmllKIlTYmea2Q1MegmGQtpiIM5gbCcGv83uWhGUmksL4xxLgoCaiNaSmul4VehnQ/PPO4KZb/iFUARzptp8a4S6gNa8TB/Frpaa+fhMUUkVJ2HulC9hyB5lKOPyGc/eunc2UEwzP4YZx1hqhOOUu0EQnkOxHJdzzGdylbLp8BTraAEVC+po0ApZUQqhO6rotXDSOkVmFana3e5QFXLKJTGZEqjig2VJlr5YKW7t9YOkqozRpnujQbRhlrbq4uDdfXKbQRSBc6xtLVSRjgLatnkJbWjy8EZm2STMsWvG4mFMlD1IoM1prySR3I32k1WG1foqopWhFHHxGSH3njT2JIUUJPTK3x7mvH1jzGMi0rUo2yG6wa3ohFbS9iY52iIj1D6CWZIMt3stwyAUjidiW8rCCUnr/Si4UBoCkEJQolVGs4fX8dOvxg9Sj4OVAjNdc6ps3iaA6ouwhw6KpfKGJZVPEJYyUnYOKrn1rm4K80xuTVEijJEW4VdBIG1tKH0R+E0lXshT41XBSqXyiSZxFtyCFXWSu5q34F6fK0maKIzhs7EU7kDvkE+hcdujsFjCKVlsiNBKdV8qpFXx6KeWccQRENl1a7MtpiopnFdiA3KZgIdSX5ZnuaUOt0cgKQTbXGX5EkN1KPRLm2v1XA2iKTyOepcKcLyZSLnQdLUQqvXNR4BX/lQHukuA1XvYfnEX5wEOq8CxbULmy7RMqTqV++MaL3j5L2+BJ4oQBS9nBHX2C2HFjLY+93n1BjwUIXWgdmgCiHu5BgohCpDStEusHI5vibpqmJW1swyCq3fDAxIRqIKEKgXChuNoCRFLIv04XQxaYEeLurGc8GQQ5Q1gZdHPk2UBHSkfNHRUcqUXNOS16GCdYzzJKiOQEaZitIq32qwDpyHjOH9OE92k+vIXzIDfOuztMJQr1Vq5UIDioyeLqBimLBylCVbATQKkkYZyKNihBtstElGFKQn8WkBJVM5f4NdfLqWJAKVRpJLMzoKkrxjUYYLV9mFaHsVd1V+gVKqboRKKRT9EPVcKP75oOpBXIQCPWsFlV/wOmc+OtA7AOrJJXNIQ7TVmKs8eaCOob6VThCm1VEguuId6KOKszRKq4hFkgQdg9Iqv9IGZVjLeH4Vrw+UYEPKo5n5VvJk0fhosjYIzVVGyS45lHcJ9VBByRRVzEBC3csDVdeiL/uJ4Giv8FdxRzYaUf20Y3vB/ggouog32HAjHUk20ZfNhnbLaRKy3LJiA6nUaQTSB7pVOcQzS0LEAzmlK6Ho6Zloi6Zm/StiRDnL6KeGdn4lnwBQq6JJLTdxUuQKn4UiQoFDDlWcSEgpTwJrIodyDBRT9/NBqflZ+5xt301Jp+11Keppy9Tj6incnDGKViaEIq2BglA1FbWWCgyWXqQOLcf0EeqqYsJ1cPGWqSwDpUtdS1ZRF41QoTpKQ7qn5zFQ1zoXbx2l7HwQEVyjpftqODT2akSW0jh7wa8vwQhI7VYRxE1UsnD0bHh2u4qWEcrppRPREIimJtKCsX2HO3YjueQUhA2UhiIdzsHkXCpRPjantX6VIEwtaiFk0gPnwM3sSlA5lCoOSrKwIdRRUZmoSAcCyaY0AuXReYh6lgOqhAG9HKQvRZaAt56Ll+gpj9IorcocBQW6F6aTfpVWqPvStdIHy7OhRN0ualAepRfmggqnxaMWrCJXFQ6h8xqiyTo6lThc5LA9PGnjTGv0HaSJkkY8dEyjg1AIPwWqoiuaq0DpRT2w6Cv+ivNX5VIazS/UglrHFwQvPQV7FNRQC0J9iU+I0psoZGIzkkV1uogrlUvgeMlBYJT1KnwC8q4hVHmVXxpRUzrXbrBDsajf5kXxy4d48YmjtHis9w9E5+4EQJ+2R+7QPuUmxrkqQhdVMAPK4iKlDAYVOFBUMCGlNFFwGUj36JbqfsQY8reMffTig2bzM0HRE8gYHFAD2fvMLmgNHEV0qmgcRDugr7XYoGKkIPENHUbKUoWF9/o4VyNdBQpCGjoGw4mAb1gZOgr1XHlFP7wWTdGpwAh6tJnGaSGPHkaOK4Pr5qiNL5pcjLpIRGXPA0VD9OpArTdoNUR51LOJrsqo50qX744RXEtnwTM1Dq2cCzVE0a7GNjfZpDuCVmdcdZRed6QD0RQMvtZ98ZCuxU+go1D3SpNHDi5dlGMumAXKOZRX5ZPjSw6dy8mlLzmBeOlc6Y5H1ZH4qOEJQfUl+loCrHbc+5zu5JCh3mQfUVDpRLsOLAFD+mmuAdBeD92Nk3iv243ZubPY9sT3oqv1LCsHoXmBSxFsRVaZxF/l0rEbvAqUjGpQpL8OEIqOVwcS6Vr3Q95Kq3sC3ddwRzJKZsmbDSp/3J0FdStfUPmUziVSqIEwmSIWC/hHOVU+geQS7Vward1ootzLZrch+wO2lNIIIHng/EpyCuBmq0XD0dGMdrAbLK61yb20WILA+SW4FCa588DQgTl1ufVcLboKn5ZP2UoChamnjoHiIAWqAsJeUWV3Dy4i3zP6dExQcPFR+lBhUrbSKm+IoiWeMjAdda08SifZ1GNLmSFfPRfIYHW/VReAniu/nFayqzKVVjIKOjCP3aRQeKrGS8MgheXqoRXBaP5DDh0a7wXkkfzdYB0omnohSNe5oPjouUCy6jltnwPJIdR95VUZSrlT6sLW4IUULQEq9FaPUsrzF0HpR3RUJqGuBaoP0QvLqKNQID1KF8Wg+IUy61xpdJQe9H6/JuM0lhct8ckFVR7xUVrdEz2lV33oGNLQUfWh+QPll3x1jsK1TovaMJPHPelAMoiOjsojGYSirwZE+fWsCksppe/Wuw49Me7G4jCWRK3cKyZv4PiSU/pWOSWT6IiGeqUIBBeUGDMkgT0odxVIH+RkV3rdE6oMYd5QJh1FSzyUJnwe0pG8sqF8MAdMk2EosQgLyKz8upTtFIDiow5KID2Iah+9cfXTfUxsPsRck7g6UNJxgnN6fXkl8qVAvbzMoJcjyqKDCKa5FjKPO1KgCiFUqymhBZJAwnckj3J6KFlmMUOCJ4OKLuGW0ks5IQ7QUAm5mQmRGRCJcqniia5IhT2MFBqCaAkFSueuo5ysBoGsX3IfInomWnqu/K2gQPdlDFVgaKiD6UlGVZbKpfvPuOEHJ0nQSoYGH6KjtLnJo3RUCMpoBeJZAMZBiuboKb3ySRbJpmvxCXsPnQuUXnMqO0Ddi6CNPlByKY9AdITiE5ZTxzqwGAzlCmlncU96Vm/TTSbJq3RxUHRkrMovEE/l74CjlkTFN6Qn/uKpNKKpulR+6WoAudEHMV0rrTDUdZA2iGpEV06fD+pcaURT+SSLMAZKp3KQkPcBUpTQKNeBqsujDAfVIGv1QTYTBWUOkjEsn/JniXkRiECaL5SMaiAFoi1+B0AeO+hInuu+yqk0IhGi5JLcei76ui891oHirTyZSrAOVEEFSiTCQFhW3VJ6HatA0ZMOFGU5GPzeRpAsuD/2v+6TSjvc/vXiKILAwO3J1gg934W02v+cD+ErQTVYKrTEyJR0uSDSRZBS96QoPXcxvjRODebg+MqncquAUpIKp/QiERGNKKiagkk26RVRKK0KLkUqSURCCODVh8LSREQPVGM6F+M8UIoV8VWQ/duAh+iIl6sAjpIFEg4g55Iv4ygyQqWNRPlzGSy2M7dYEhhlK7dES3lqk+dipbwST/R1LdlFR2lDnehcOBhUNoHyiKfQ8RcxQBGTnoWQy4n0lwfqXM9EP8yLuh0P8a8Cw7ySW2mkKieDdIWecmgcCznVc/Uykn8VGAUF0SRKpconusqaA0rOEMIqED+HengxiJBpcfL9F/pG4ZJBIDrKIzoU0dHK5ygTUFah0jgatHx9pUF5JYPyyD5ES7KrnJK/G+yAeyuoyEJlKQBFU2lh70D57XqQunWF4kHOZvJDXPTFOyxH6Py6r/ziIblUbzoqnWgLlUZ8dT+UP7SHbO7Ze0DpJAoqcRxEsc6OETICsZxXuaZAkltJxL/VITfnxIIXz5wU3CTgd3/H/Mf19qyLro8yM72W7BI3k/GWNikUDhgWQrfjw43nIiorr428f9PYOJUJ1qMcu704S5aNjY3WWM/CM4FvY1Oqtbf3j1ma0Wb46lfX+VlZCb+xsctraGC6Od5rTU1Hrbm502prW7yWFjW1J4d5lKVhO32CeocYSGUeQdS1f2MpxQeG1+NHeZezYJXBlyl8nL6RDSjxZrCV6zY2pA3N9uTCDHF35sx0u/DCRf63vnWJv3hxtd/Q8BuvcT9yU/UNTfBtR8ftHClDQ5OH7rlu9K2ZZ/4QNMd6e8F8NtZ+1hK330Z54RuvggflbVR5QY5eHP6N2K67hw50bJ8gHZxM3l983xLz8I32BLrG4tuouzbK3I5joHuvDZ206Ty4tsNHzGtVmsN8fKxz7JqZO4upnW9bf8pr0CgBKV9brnnt7+CIHbVJjo4zsPUp1tYW99oa+f4JOmnr1H06/MOe18oeyzZso7OTxGOEuTPh/yXrz9hGxt8S87Wd9w+e7eLKi4WkxuH4QYjPyyO0f/feACFNWGXTm+R051h0e7Z5z9O6vYhRbasxr4GC/L8A+fmptu/V/mC/mVrSLgYk/91SfrZleKf/f6Hsv+9lyMqi81OdnSaYOsXspg+aX/YGwR0+UIsDt/acJuaw+R+fNf9vLmfT+TNc/Iq4ptoeYmb/ERyfZiiAtPBkLMc1LlD5SQF5cpnAK2DSKld9foTW7LJc8y/jSEPgK7Rq5Pxgr3kHD6fYwYPnW2lpunfwYKsdOtTg1dWdvtooKIj68+enOL6x2BHr7R1bSz5nznTfItRoH10VZf2rfzJvNE7/2c9e7x88eJCyV3oVFa0MCcfGdyz1MjjtT3/61URvby18X0fn9ei8i7K3o/NJ7FoHCfDNb96cWLs2B/47wRJkqEOGbmTwkOH06EDibN368cSll6b7nZ1xorojVlPT5dXWtnJs5zrNe/bZFnvlleZxdICDCjvodMoUzw6VpfQvzCAcxFRcyM2xk9C9lgaopncl/NfAfyr8m+G/E/41E8ef+ZjPfRSnJ9Jzob4mkW2OHI0BgDrtU5jVv9wRYReUJkLk9LmQxRkcqimBuRu7cJjH/XmLzS/KJWRJy7P+/iv85ub5hJkJKyur9l588WVv27bXbPv2g157O7HOJEBR0Tn+iy/elOjq+oU1NBxG6XO97dsz7fnn++Df6FVWEouNAHPmEL+xrU61+diz5v3Vt9iuMQwUFKz2n3/+F4mMjCOEbOwKbXwFvv/p7dixz158sYsy93pVVYRGkwRr1rzTX7HiKNRXo/MEOo8gQzs6j1HmCvhXo/M30PmRSZHgzDPZSVK0wC8qUleXjgxTkaEfGfg2ZJmHDH3IcBQZapGB8GkSoKgo37/00qv9NuJtOXt9/VGvpqaH84jV1UW88vJu2727bMKcTkW48cYcf+FCxnNhn0bH18Ywoxbzrz86Bf558M+Afy/8O+Cvt6QnDm4k0lioat8OvoKxttmzya8edYROL25jZBqE+Y/iwhss4wab1XUdu78KNWFUyeTEoQ7z6nGHRqg2cM0Q2mug3hvpZBpbU6n0dE9j6kTi9LX4KqRg1iyNp8Yfb33sY+f6Dz3Un9i9o8S7dJ2ldIzgL3PmzLaMjGmUOW5Hj46fbyD92P9ecsn5fmtrE/zb0HnHadf5pZee5ael9cK/HexAhm5kGHs5TjVHRsYUxsmnT/9r16b5Z8zqszp8v66e7pW5hM7Ja99PUM+rj1qiYDvR9r+yLlBt37vTfUFYM1LHNu8o03hCfZxey3a88abv34gCLdpigggCYZ/O3jtKx92AY7TVMHFKoHGoggagUZN2kzdxp8IMBbNmZeD0pxZNzJ07HQNOtw9uSMfpadVGgDZmZpqbmbF5i6C0NMYEJoPLtwj6+3vtwIEGZMDm3iL4x3/8k0RtbSW9bI1VV7tQ36uu7jqlDmC4olx+eab/43s7EtW7zKvZzRu3R8yvTnCOL1TXzqGn95P8J6cluPKdTCLHcPonkZJxPb+y88hONw39ZqdXGcbg+OFMvt5wuu068kZZVom6JQhRmcbnIHB+0L9Eof9sUNtESK3B/+HDFzPOO5tx3izGfJ1glVdaWsqYL0bIU02iyYHvfOeOxG23rSLM3APPGPzbOR4G+zg/avv2NTCzPbKDZmZm+zfcsDclFhve6f/hH76a+Pzn/9jv6eFti1gVfMoop8b4B+FXTnnrua61nh6GXJME99zz+cTtt6/xDx9mv2xpA3wr4S9shncLMnSgc7qiSYK77vpA4itfWU9Yp3rvQoZXkGEH/DvAKchwFBniyEDPMEnwne/8KfX+LmSIg2VwqQLTGHJMt/LyI/bHf/xEygsv1I8x4h1e2C/e0eHnQjE3Dbs/h7QF4ErOM9+fvJgB/wz4T4H/ffDfNaH8N+Lp9ktYldjDm9mqO5TTk2Isjq8vgrjlO31XTO8IF7pl79DJwyaEWKAV32isB+npGxv5+GzDLHrLerCHa77HSC/QyBpOPB7nevIMUAWcPfuIPfDAw159fRVjvC6OPRw11vQ55xWv1tFFAg888GJKff3wDcS55y73zzwzx/7lX35KT9cMjxZXPjUsDaynxeOtXLP1fhKdXmWORKbbgw++BK8WZBDPJvhLHmZ64p1cjzBOEZFTgLy8Nvv5z59DBzPh2QPWwrMNGbo470eGLifbKbAYMasava985V9S6upq6Gl5r7muzY3xGxo6cT7aggmGXLz9rNw+/3evEFOXM6bHrOro+eva58H/APz3wr/VRWHMuUwwdzYdLzT7gyYcf4+2Zp+35cNuHu7Enj5kPMoWx+ebd+q7vS/zQYyPuA9n0LtrbN/FcWc5S3fMIr5Ya95LMfOqWbd9G97WwFupgZQU77TOa0ydava+d5tfRRBTjR/U4QOncyrr/msscUsDjv+qvv345N+xYYfpxaEdP+ynR6ojnH7eeiK3Ij6PrY8MDeyKm0YPv3ae+WsV1rCUp51obQz2SyvzCO/yCO3SkiFmnPCuiTFO86gqZPbsKbZhA2tuR5Ots1YKUhhPwMISjJHCRvv4xlNz7akRWvUFdvPN63xtCGJYAdYiTxthZwezyke8zs6Jm2+YPTvFHn30nMTRo8ugnwmvXnjVcyz3YrEaJvdGF9bPnj2LMl9DyTTLzS4Sr9XS02tB3tWkpvbsmWFbtujrWUPDxo2f9efNm8cSYswNMQ4dKkPndaPUeYpt+BDmmpyO8eCUTs2nZ8yH/yrKMd9+/ONfMlE3dOTz7W+/M5HLCs7Bg1q+VVjPB2QP1SJD/ShlmIYOctFBI/WM7UoW1bHqOzwPi6+6ljZSQVfvOi60v/7rmxNz5pzpluwqK2tZPamxqqp2q6zs8X7wg2e9w4eHjvKWLGYP6Frzp8resGNL4YbbB6woiei0F9vTaE/y6Hn6TEtJmWrf/nZnIiMlGUlRV0pWw47GyqZU+BfCfwX8Df4/h//QEdeSJZ5deWWGP3VqFsTngrJ52YN6U83ZqKBaXQL6ucfEeUoVvxbQi0SH3AZqvsBz7YgGh4gjQfgrLnwGeTE78/JIvxKUXNnJo9hQ0HC8z1yarVkT89esWcDNIu1+Ytcan4trTEMJ2bZtWzPLOXtt58493pEjKtSJcMstvn/XLX7C7ZRT2WlgLI20mivCJtxeZkmv++4ZR6XTnEImwmSFdPO5UcCn6Q779fX1hFtay273i4ub7YUXWryXXir32rRdapyQjgyP/ySRuHztXuYzROe97BF4l9/UlEloW85wooR12hhlrmP56gC8hx7a3HLLBl/j4+C1twPQKiZgY3pYZOHzwu5Wb8swG4YuuWSNv2nT18nPK+edveicXZGN1ej8APxfQuc70Pl+dK71nhPhlpsT/l234WahfsU3Bzy7nqMmbf4I5+9PeeCBn5608dGuwTvvvBqXkDHMQIZlyDAHGfghA2Z5t217BRm2I0MxMpzc+W65ZRk6YLuadtzEIaPtwDoKueXA1TFnqvdsUL4pe9R1ZgYyHmUyr1mOj761O9Rjh2Y6OzP57G3HyfmS0y6/fIr/y4d7EhniUweq7AsQIFvEYdpBuXR/H6g0+eAytv3psVpmN3LOgb9vtdXVcnyvrpZhZfvr8E+D/wz4D+30lzNG/+X9fiJjBmmywBzZyvtBeLv9yXK0pNFrK3IVl8+Am8GXMZY2e45vTj53N5cjwUkr8M2ZfJrf+1HvbV9mO/wNbttwlBTIcgjfKtGWS8rutoTqXEt3LIs3UFFs0WQbrkdh1TyOHtLTPYu95vcvlHQyQpVVdqdjGfhfYDEooHKOLOJdlKPm7WPVhiG81bM1FbT6hiycLwXn62R7pIxxcuD697E9lTqi3JQ33VpaaH7HVmR69VQmA+/vX7hQrbosS7WK0fWVBH7E1de/Zd5X/2r4/QPLli3B0JuGNTBInQDp9HCxV6x/oXQsZ4uBMnJdrwIvAnPea+ed91rKnj0VQ9rNRRct8oN5BD5K13HyBgZKJ4X09BR0sLx/4RyMGvtxm1+2ctwDxkAFGnqRhk9kVmORL9Pfv9pnXmUqY2pY1ZCntsG8Juxv7PpPYaL3Hf0rFm0LVC+eMhmVXf2XnFt+J7l4Vv08/Nvgz5J1JVVWi53WoK9alvCasIUx80fP+/7O+lfI12eAheBqMCefP5eBEga9OIeg1elAEPnCd8HHeFBnjxDiP0KILyk7hgvzee6qVcchwM3kq+oFHa6Vk/Jz3LUtx1hmR81nkt6LZBLepJjfRISqRk1rmIx1GOeM0QMgfeONbEKQo1M+14qrzDQyDnRP5dfXbfTZJF51nb7colcUmL/6HHYJzjWPyWP/IFHQwYMRLyUllV1b/YRX3WOujIDh8H9vZ3skG/Ms3mRerIKXvJjNHw/ceOM5bPzA6Jy3VXGkBVX1pOXSyFa50PGffzC80y9alMOMceWoQurjZbzxxqn+wly8R4ZNXVoUxLlcHWBGOm47+Etvzx4XXHPjRLj00nl+RUU7Yf349g3ceOO56AADUx2rzsVX9oZDEenycU+TgiRhzqI8W3/92eZfu9z8mqX4KvUuB6xqZpzdovA6h/AaB63uVITHjsl+sg0NGzbkseFJoSw60AsvAjWAkkEYATP5k4tgVMsidHR9KfynwX8OfOlsKgmMqhhnV9UR4SCzG+9zXscenZF2bG641vwVZ8BjP6gSZoMSx7U2YUgDY8OpukkgmZROutKvOr3pU+JDj+1J7UCURgJKq6/nwkqfyC7BJJRrHsiT2bQvhTh/YSHXKIN74acprZsGoKwcB2TyD7SDFRHGvrNoWXu9srKhd8tt3JgODbpu6Ltyc3CGoLZMBqH7gl66RX0wsYWgq8+umoOUc1jLvEgKy8rhz2paHR2jhPrZjO35smJpixvrM9732LVF2Lmb8X7YqpB0lPDOd6b5v/nPvsTUDCkD7OOtTm8uhlZEg3MBPFI5VnEsszfeKLfXXot5wxnfxo0LkfVF6FCHKqfAkQ4K+5OfmldOwzIU3HvvVxOf+9wNfnd3D+XUkqXmNCo4lnM8iM73o/OhCWzceA46x+DFW8Yk3nmDuHH9v/7X0E7/rW+tSXzhC8spA58o7M5CBo3xU+Hdw7GJYxUyvIEMGMIQsHHjTeQvxo5+Ehi2ZJBN5boM2VjWWuyeBElANelz+QIEVbyUl6BcT+nyMG2fpchpNY3gWUR959vXv/5Cyv33b/bCrMcfP/3pc+EtZhQ6E+fSDw3pUvoQTQc6uRKT6qaY1BU+kE7vvxSHX5oF/wt5rDx0+G7YiT0m5qTC/33wb4E/v741BHz60+RZxkOxiINR0NHSTV0IZQtVyBQL9KN6EugLQT3uU+JIO7LTK8tAkXRxEog86opeHHXP9BmrGBKIvxSiXhkKPeiIVRtrTDGvoWs2oeYZFFZjq3aWL45w7OM6nWWcFK5bCLtJPATMnj2NpaAV3s+t0rMeKk9JhZrggeeGc8xfJSXr11f0ZRr9vp4+TVWPudYxMkJp9UQidZ1TCPHbNaYHX2M5pZ/rbs67kEXLenwwlzXm8UBOzjSWy3L8g7E4ZYskl61SoZ2gjDGua7nPUJnya0mtqal12F74iivO9C+88AwMrzzQK3bl9Cs909Jp4983/nb43n7qVLO77/4e/LRkJJ0fppxaMm3muhGdK4I4OVxxRT78i+CPFes7BKpbySBINvAvszT1+JPmBTdP/Lt06RIm/sSrGt5HOWrJNAUZqJz4Ya6bkEHd1Mlh9uws6r3c+/nPe+FxHvW9m9fnSEvkxldxbMNZ1Lu+P1Rl69TbJabjHyDb772aUo6HCLVJX0vkVYMj1rJ0WVu7nd52G8unFG0EuPfefeybbyBCVGSAx6rndwIoo2bxmERLmeJnZ7faZZddZKtWLfXj0x+xWg9+tJe18GY3sNV2cY28yMG3V/FC9NDT+6TLP9yfe/95vvfs2XEvpRv+0r/a6K2K+SXHc2Am/I/Cfwb8F9t5Z1SyP4Db2WAOA4MK/XT7PY/Q5tAMjuz8Q1ZkQEA/8CBYto5B1ipO9JHGoo4VlrM9y7xtGMeLhPSv8OplDQUdWb2iNX6YQUVXbLb+rN9B41mwEqfns04tGbZw2yxb9Dwy7WK8dwiFq3PrGp9fj0pAjYl7xxfVn0D/wQc/k/iDP8hAfQcsNXWnTfGZyadmUrA33ge0L3/FUu7jpaATMk7QjQcf/BP4s03D/tO8w7sslZ4kHeNLx6i8BUSfpWd5H/1oVcr+/YRwbwHMyKDeH6DeGUd37sMf+Prif+Hgu7C/ksNEQjT2p3PpLFTB+vUz/P17D3vaf3a6+d98s/n/9CVLpGxFmsfALbQOvefxGfE3v34bynr8cRhjcuP7pOOfX8SgOp/M+ippAUt6RW7y4QLuREHaGJnEISb3DjadQWh3HpjCUk6dW8rRLrG+PnXZpwZ3fMr8f/wkff9m6PwSVNinj0suJxhEQkVhblORQix6wBqN82OZyDEVeRKEm30c+5GphxlWNatjhwce+MPEpz/t+319L1hFmZbsKHNsHkOINOh3cd1FmNvrdXScenlHK913v/tniSNHauBdQ1mb3LJpeXndiOPa0dIfKd1TT/05bwL68K8Ga5GhChka2JnXPHH1/mnqvRhJykAFDoqGNPSlO+ok8txfbd7rMSbIGFbuO+jxywpTvAMHesb8FiYURw0/+ckViY9c9Ru/8zn4vwZ/Opp9NET7iMZLsIcDB/onl//3LPGR8+hv5fjCEvsOCwP/e6cbrA3f648U6vNcv682AMyhEohI6QoxckGcXmOr6aRazXr+6osbrNc/i/D2Ej4EoZ165X5tbcx27DjEUk65FRdXe+PZuZaSwq/d3ZxcaqKFZ+4Ly8YEpjIokwyrQY3tJVs3vSWYS4SQ+84O5h98Qv1slvO0W6+f8x5/376I9/zzPm9H1Q479obaAHzmM5f7cnotK6T1tdpywuDlC8x/z/oW9uVr6Sqd8DadsNZ8rblv22beyy83eM38ktdkwWc/+1H/s5+9zO/tfQWdR9D5cnQ+E51PQec16Pw1dL4HnU9QeHJcQT75ySv9P/iDs9AJH6/pvRgZ2pGhCRmakaEFGeqRYT8y7B2XDK7e76DeiULcJJ/qXhaJzbl6xw4zOF/FDMC8hfxUyZlm73gH9d0806+szPZ+97tO6qHaG+1eCqiOGp58stb7yHrzM+bCfwX8iUzOpMN5ByF/XeP58M+CP7+Rta10cvjzluhHLsXxafjcnEIwSOBieKdXAQc7ta5PAhW4kn4xNoDdHt+0pVVr2Mvwi9a1kSGIW75rYsxFj88Q3lpa72MG/b4wy4QcP/jBiL9CkyqEeq7F1w9y6UOOfIK4DgfcSov72nYUzpIay/VWh4Egi1fPseOI4hHhqcH8+a12xx3bUhpr2YYKD4bOxtdkvHgTn1/vO3AccR6eBvjRjx73Hn30ydSWFpYycL/TDb/+9S7v7LO/kKpt2Fonn2gZPvjBRf6KxcTSpQyEsLnfvm4eHalXh4PVUl63NZawX1/3eXPxpf/JrYN//dc3vD3FlsKbeO6rQm/mv3PSq0JL5g5UzAY1i9G9cMVJRoZROP6ttLXPxAJSsYLz+EbryiUsYZ1LiDvV/FIcIIU19MM4fC8tXTuTHBNd+eK98fP80KmKpM5TUbp+Wms5WEDDv9rshjzz301UcEA2UsaRpZgDtcGx9GAava4yjR9efPFdicOHX7KDr/dYKWu33ZSTuTz3yajeUyM9fqHImZMzlyW8mknR+WgEO/PMab52ZLa3H50UGTZu5Atv3VQq9b4SZ1/B7tDqDPP3zzBvP562v5tjLddl5lVUHe/8oynBqaVZdzEy7Id/7PTznzUT2eX0JWC13rsv28rZqTi+G9+rUUjbzJ8N7ieSK2kAYu5XS6bNJ7Q5k1nWKA8FdDbumIvzM+4qj7+Tsd4KxnptHPVGWDuhXu2oPnjh6Bz3p7Aww79sDR8/o2JdjJLJMQrmg5pngK8mYmfPIMxaav47LuFaoNn/zCBRU1Mtr4m+yrir03btOsP79a8TLLE1eL29zJ6NALNnp/NRiRd87dx6j/ixJWBAvchS62cwxr+aMb7G+kc4Ntrrr5ezxfYNbzIaQYm7cOF8eDzTP2sWv93Y+2uc/+fo+g10PY1jFscIOq9D57TMkwD/7b9d6P/4x4to+p5BH/yiVepUZHgXvM+Et8exhSOTMMWvIQOOOw4oLFzsX3bZlGP1Th2nEHsuzgYZVl6VA1EafBfqcr+T0QwNv7e/Jh1nPBPe06jnklPamTmc2H/x5+b/9ecYhgiwg051PAei3v798+Av/XfAfz/8h94tOBz9kZ6ds5QU20DtaQlezMHpRw7zRVfOPQgGHF7LeDi8fqr3N1GmyTjyBd3pTKXkMZijh9Vyp1M4Bzkd36u0cmb4Y6UzMAB23sX0ui2/IhhrtYqKtlMa527cyMxR2KuqPQsd/yLOJcc0kIp3qzB8wbedibtyhiGxVxdxXIQMtchSwdFHFi0pjs0QZ9CgyLgdSGNgJ/JU1NEUsnGjvHYZtPWqazPHFng08HklBvpBcxjkm8C/2kP/3e9+I9Hf32OvvrqP9wFKKGcvvOcjg8/xCDLUoPOhl/BORZwPfeh8/4c/XInBP2/Nld1WTm8ba+pFBjZ6xHqQoYdjU1KG1nGz2rjxSjT4cpAfG3NzONK/HF5AndcRCWifyCGqVMjbx94hVoL1paFa1vomqw7Efh17+hlaBjxZRTpUznlFuccrx/D3J5+/XvnVSmG5sWNv1w7OQi+ReMMCJjQY/Nw1uJV+6DH41dmY3EpulolOl9SssHfHzoUPPX6MEAtHt1gVDoCyh1kmHsxgzOe5i1BosfWny340vt8LIt0BWv3X+OJPjFAnxhhLSyqxynSMLYHBj9yLj1WQL/6p+TQmpt15Km89KwZvJcycOZ1h1anPW4y3DKtWzWSXXgchftDhjZfOUPlyc2ezMvCu/vT+f7OqYjq157V6gi0wnj9UIwcL6v1Isj0eis5k3p+SzhYTooy3AvQluNrPWP+U7+MR8ev+1LPHSunt8cbRgdrPJIROfz3tqftV2Vwe4F70o+n8Ql22rexhfNW/2rwpPJnZY/78tjnsWsrSZBoz5tqk08P5Yd6vmDiD1IcD08uQogSU40viAhp/oo75zDHUsYhfVzdbXzfRbD3HBMdpDnWul3K0d/1UP/e1Kp9Z2zmEmEtx+sbplHc6tD23GSge5zcrJ+Eda0p6Urj11quZOdc35Drgfxidt6Bzur7TCFdcsQz+LehBG6L6kKEbGbomTILPfW5hQk6v4Z3e1ZtxrvnLlxB7MrdSi+MTULm9+epxedXeTerW0Qm0qIM4TcBnxP06oj62p2NvxNgcW5DldMCH2ak45d/hFJ9Gb/9YbCxOL/kG9fh+lJdxssy+uJ6tL3J49fQ5fHQjl1Bav9Ka59bJ/5i7CvUzL+MPHujia5o+N9COEhHPZJzbxDLWa/bSS8UcX7W9e18fcsnsrruyEqvPobYGt9xMErpJeJR4xXTzZzJRZzFQgYzC++vBPDDtPfyJgnpQCm5Pnl9pR478Ib3/YkLOTkKvSnv55R28ibeD8Tc/pzvCvm2IvAmu4j3rZx5hLCc2Lv6RAq4Dz8bhU9imW8myVSVlbYTHIbYB7x321cs3ER/lxfTp6XbXXe/l6z5X4QYSRJALSufT0Xkt/Hei8+0cd6Pzg0Pq3GU9hT/33PMhvvDDFl+3viZCK5HhHGTw4L0fGXZxfGWEev9KYvVqbU7Hi93kTRilqdN43a4oOOTPxCzcGFZtWhYo3avhD21F5wLdlyoY8vUwAaiVpVYiUr2E2E2P3JtIZx4kk8YfY0Jq36eB6m/iAXlka0I2ftkUcPoMPsIa9f7+7/cM8g3uHwe7tlrivEWE2qoKITyljh5kapgN/1T4w0vb1nuF8EpA0WcewOdlpGCcTLfNLHUAtFpuumAm/FPgv294/ufBf7d9k89mP0RGNDW6sX3A6wTHX5/PD2RcxcPA8eX0WVjWNK4Xc/f9jG1pFsr7VjKeu5CxJeO78jqOjTjYURztCOOa1lGPq1YsY0Z0h/Wnau5DlRlWZKhI9fKvgqWg7uWA7wWvZDZ9ymXwPgfeGs/XwX8fY8tKjgnkSGMcT61PEFx4YYq/6S8TfuwAZaeniTVOg9cZ8O1i4qqJLaGh0U4Qw0FkVqyYaR/8YDZr5fP5nNc0ytcP327K3cl5J2VtRed8egUjO12gV4cPH9a3BqR31Xs/MhwetQwrVixh8uuJ/tTUNxD5d6AqOJLEOLbwTNDQ/xe3ykDZxTxQzi+QLche1CAoyFC/4xpkjkqrc6UVzgB1T+QH25fyi46mQXAbB7J6+OxlOLG6YOgt0le/y/yn78NLZZt1IKtHrmNCdMdbfSJ+4ubAQh46ShbJFBY1TSdiijB68UYQyaLBXO6tXv2KWoeTwtXsHXm6ls9pmv8/aR3IPDanF9FQFcnzWomVzSReFCFzKEReJ43SK555L+GcL/+7eXvvhwsL+C0tB0Zd0SJ+MrjjFkukqniDK0a6kJIE0kmoGyQ7lEMHwPh6219P8V5/vYKw/hAhViu78I6fxJlYR3zllYR31R+adyxQkLWVS8Ixw/uu4YOIZ5FNIlJOTdR56EDbc9GFL1vQLyO1tM/mnfUUwukePr5R6a91kiAAABa5SURBVD30UIxyJk5Z5x/7qPnv5H0Hxx8RUuglp9JDTc08i+3CF/BC0VT7i7/44ZBGpwL/+Z8/MexzpRkO7rjjA4nA6V8k2S/RQ2nSEnO5xptV/7IJ1b+OcmQ9knUKSOIcTUf5i9LLTsK0aiTCc/XqAqU9HvQs5KWGoBVEH7sk1jDwxc+jP+WtAxVkloJ86wMevC2C72g3aR73VoMC0RX9sBFyPyGnwqlggqpADidLK6tOhAjDwBf1TT+bswPTAcbu9C6Xy2tuNp/N2ucXMo2yng9/FNLy5bv3kHE2VwGLOa4DVZjILfRy72Fs14thljC+28exBtT1VK5TcMgut5wV533Vk8GsWal8kWRF/4wZDNq60aAUo8rjw5wBw5JAsXu4lIIlx7Lk0X288P3Ji25kqYffARqCWl7KOMpxisOKim5CztdYYjnIsp20Oj649daV/r33tieaePuDYnr1VGR9/HzKugC+evnnMOcd8GlkKFE/JJOpOHf5v1v//EMkOQDKGGWgMmiVHaNzus7nKH3LLnRfaTj29OhNL3jXnwHPKMcZ4FGwm+ujyNKLziv5aTJ0ehLgGxVW8bD1z5ahKrIUbfHJB5O6jbd+wObPfzL1ZHMiaqR27fp5YvbsGsb2L8DzdXhrriFDyDVVVdeZlEHWfiLoi8eVlf+dei/nYTH1TrcpPTij56iyCnWt+7ILXQ/Whe6LvHS4F6wFlUaOlQvmgQtA6VUgWsLjQbTVhodA5MC3MO2C91nKHjaEhbcHH887b7a/a9dUTSQF/LfyVD1/FSi5JIf4vxe8DJTc4iOQPFkSkMV/d6EMMXAfaSgQMjJytAuKMvjmQefJ+fMx21361k79NZ/jp68p/egn9GA0ABJzECynNLtb9eKLuymh5XAyjmxQBZCskRJ6B+b/iWW6ujLo/afztROPEPQI4V8zoV8noXA94z4Nnk4On/rUpf6MGVfwEJaRHaC0J3HOBtcG5znPoThCQUkTAaW4NCktqhPG8X3wUri5H36lHJs4dnHs4H474WfLKfeQMLIZM+bxZlQevWOpHU1tdr9vpne83ZJhTEMNnTfxe2caswwNf3QVE6K/5vlzoD6T1Ia56JXKmWh5OqghlQy2AJTRSBWhwWMUqRpSMJnV1VyLzulkarRc2Y/OtWSq5cRWdK6u6OTwiQ3mz0bdrpeq4iidRkHpV7jS7EePP+EN9f37973vPf455+SxFbeNep+DDPOQ4SgyHE7W+1FkaBtWhk996krqvRxm1LleeFeVCynfAKrMIYb3lSYiY6Q7j1D4TAqgNMtAOb7kVxolkQ5lrxH1UgJ6D9mtQGmEoS3rnoB73Z7Z7V8d2umV7Atf0BIjEwI5hAWSQb6xDuTUySC6op8LSr+SI01C6UKJC0FVbBYYB5WA80gZeiuz22/vGdLpSWhf4LVzVAexWhEQp3EBRRWEPb725b//I9zIs/lWVLHIomXMYseYzcaXDLvyYky4VbBeX1mdQg80/qWclSsX4lB6B4j/7tVDOY1qeSqoGtVRL9RU4VBHOX9rYcaMNF7jlXzjAyl67xes/5wXOHnRniJUe45PWW0LqP0mSoObz3nuwdl2cdVKy4/hhDHmfXi/yYvVoHPegNQ+mPEuH2nP+xu/5Qsvr8PlGVCGquJEwYvAVUwtcX7O+y11/0Guh4AprGGdyr7/lStzqXd95lbhrOo1aYJuYksCyaa85CvcCZxB9nEMvvzl2X5OTqp/hHU8fWBF31LoZJzehX12CunB9fsZXcyH9PXNpOGXb4iPunYaTlrawF/EB5tLkBgWmiNhqdYbaVXgvvve636a7MiRJvj3wP8oR/pK8aZIIfKj26b30vwU2bJCEcIJV1YaDeevVMhAmVki8/vosJoZzg3dWS6h/TjwSZbwHiVr6TTG952PQDPG1ZhhcIuB1vXZHn2BIJ5NzxJbkGnRVLZfz8g07wxa0aXsWDuLFHzJis9bsVTWOI0QL0H4mSC87GXWdPT8DxzAmo/V+qCMaFAfNRwBFixIJ5wfuncbIfuYHmfy5ZUbblhMeFtJebsprzYB8R3Q8EOgo6B2DS9TnKO6VvFc33BRSaHd07oT+yB2amXvRInZXxYtbomnR9rtrBnT0Dkd1lJs4iwa23pC83p6Noec6z0E7U8frc4/8IFMf8V8mL/s+L+5r4hwL5c3nfeaN5zTb9x4MzpoQAf6dmEDemim3g+Paan0wAG1OAPenhTm+IOcXU56ItTUtNnLLyW8KnboVVd7RH0npgnuyNGFxwMeOU6YM2caKxZlfN2njq/7HIF/P/xHMnpVeFDp42Q7kO1LH7fEFLUb03SrK2cjtXi367THPs5POr4y+rl3EnBssqVy/HwmL7rTu61qUZPlLsL47Ex45YNqvAZ+KCNQrDaIHarO5XfhzmPZLMG4Wl98KSVkfHNrTc4Jgc2blyRuuKGGL+guZHZ4pVdSMp1jB1slmzm2sKzU6HV1Dd1yjlWIe+75ROITn9CHA8ucy3bRlGt2v3j3LMqaCTLMe7WR1n9onl/4GDrUmDQA9F6bdTlOj+ObkP1RziLpj3oXdVl80VFiQJzRbUkOgrpAmUoF6oW/Q60L0PkF6LwTGQ6h88ohdX7nnfSyqi6ia9fba4yv79elETa2ck6H9I8/GNohf/Sj/5m46SZ9SFMmE2BzczMR2SFkeBkZtHRbjgzxIWUg4ynB5s0XU+8tLKGVBNFKJFVvReKE871vfKPe27z5QBg+nBKfk2VesWIOW7w/1T91qpSIi1jMJWtuXgz/pfB/Ef7bJo//crObGarZL2AbeG3kYk7vdlKM/U9AIpnvtyFJXWcw8JhmuQkibv3+HeGmx45Uc6idchWcY0THdu1VkUk4+eB5XfZP3+3jd9Wb6XWq2aCTwbGPV2KDH4wYzbv/c+dG+KrqXP+xx+g2RoCvf/3fUv7jPzLYucdSYUwbeMIMdMUM1EeC1atT/auKcLztpGx2SmJwt7yOSpP+u+nxOX4n6hrcKejcs0y9eRV7CT0fckMsK5fOqzSP4llFeSK5U5IQwA1wOQwDhYU5/mUX1PkuxN9LwjfYDtWE5U6Br8eXDGot8wDh/Zanh3Z8bXm+7bZvpGjuRluTKyr0Yo6GZ6cT1th99+3hJ7EavZqqJj5u2U/Up9WdGB+4nNzob8OGtf5//EcrvPX13gaOfImO3US1teXgr+A/Mb36UNr85t/wiQmNFlTMoL/teHGoxKO/rzG+NvAI5/wpQfi//sd8a/7GMuv/4FJ+hG+hJRbwvnNaKi0OCX/fka/4+s89N6X/1s+4Qdakl+ehB63ff9T6/ItBs+/5dt061Ej85EeFazg/YItueZgX/b86yw5/cA46n4vOecloInT+4x+f1e8fgPftYI6VIMM/gN9ysiy1Ov/PrO+2m06PLn7fbeetkH/DhtkJPsrU5/8qWYeqM5v25cB+kGgcoB4nBM71Y5jN2Qyfz1iw0Ga+txAn14sACvGZiEzMZfTNPEl9/FyWbuYyztMSksZ8+sDFdJZpPEJerTdPTusXiaSxK+69/R0du1m264H3wiRGeBOsnt1zu+A9cg/83e/4iSvO6vEfYuIsLPxwxx/+8NOJ5cv1M0hllFXbgKdT3kyu9SGPSma064fMvnDhNPvIu7p8+98keV1T2WueCrZYunll5UtTyJ9nzbPypiPPcuKsfJyQ8b0mgBNRdE4rT5Th1Tdx7NaS2WJkSEMGLYny4ymv1lHukw92Fy+eaRvexwusj0HvGdB9hvmabcG2bH4HiZWEVsaMP2SPBk9PgMxM/dZccX9/fzM8D8FzP8dmZNDSbQfXTchQiwwHJq3eZ87MhP4T/W1tdYyv9xBaF4P6vYAujkftueeGHuKcUKAx3lixYhHj+k39icRheOnHOSo5NoGHOW/XEf6vT9rwZsWKafbdb7GBowzBfwdiQWwh2Uq7vYUzrGF8MNjxmbYLxpkuzNe4MsQI5zztIsTlxxGssv01jOFccArLN+kcu8Bat3w2WeN6Fe/CCxfzZZtWr6JCb9kR+pY3chRqE8/J166VbzB84Q7zb34fjRnl6MSRRgPt7a28ZtpJGdPAFPhqGbEKOfQT2MOHmLfdNi0xtYnYTCF2m6rtayXH89wUaDf4PrFqhObXrf5w0GyxPvpRScVTXGO1jLcB25AjFexB553DTq597nOpiXSN6+X4JfaQvr3OGaD3MeBC+PggL8AM9TsTn/zkTfyqyxR4teHgCvMbwXp00MyxAaxDhlN/F8KJNMSfm2/e4C9fLqVk+0uW6PflUwm1l/ia6Hv99UbvP/+TceckwBlnZNoTT1zdP3fuU476vHl98D8C/174z4J/Fvyb4P/aJHA3O2Oe2RPf7+qfWw151d+z4Kv2OK/g/syzW7GMsU/qhYIOauX93FZ+/GqrZX2xeZq9u3mB5ZVnYGSkLGcop2Wl+MidaUj3/8rjtVeb//jd7BbUclWMNYwHLeUXe07e001EAabzPbLyV/v656ptvpvWucy+9eYfPRCXtoz/YR++cIb96kNdKXZhxxxbWT4VfROHl/P24RB7cUYlXmYm8wFb/f7ZPyX5g3qLa83XPNtRspGGZlNys1bfCrtpeYOlVjJB+38r5ObO4QdH+HUaPmXbra/Qnia4+upUf2ZGv9XgeLUsYYPWrZXB0wArl5n9nB/YOFs+p57+eZYGDtnD7DR42LN74tw5Jccf3OOnzbJZiWssUnmwq7sEg5vNr6rMzZ1FHDDDvCXM5Gtir4K1fF5G+72D1bxd969fwemfRvTtgdo66UEnEz7+x33+3Co4KMQuU3utpdLjYVbKF+3j+/bZS7vrE23T27ts2oIMW7Rojnm57NKqwCGZT/OaRxfQvIn4x6/3/dm/4pY6rLg9e6ft2MtZ391u9WZBK3sH7N989gcM4/TXX38Wk5rVTCh28ImxN5E/bReXX37Er6rgM0/IWoMGu8cd4I5O5EvfYf6ffNj89li/VfEx1SkJxmP8cIZHndSgg2H2pY2OwTCpIjT6n7nB/L+6xBKztpKwGNzN3zZ7ip++fvjDLrwf3269wWyTju828BjLeWmb7IpXz7Lf+mfFu8pgtspW2Dp2QgW/cz+drGfzXgNj/UPs39fiyf4U3ounMdjOFkd98mqy4NvMambRCJW8wVrzASamDxDn0ALrbdiEzztK9JAJJs7dkXvhUSuK8+fQz95qiRn/hnRS5n7jM5jWx8c0GF6PDFt/Y4lKeJa+ATKrr3fBD5YFPcBQuVPQzZ8WMVZ/kBS/hp/bsPOD5/iJI2UZbLp9V9tH03ZYyy9Zx2+xI/EKAvB16D1fm2rCXZOHMQh9NvxQjKkCcA+z/EKGm4EOpAdQn+PWUdtrPz8d/goR9xjh/e0/w+EZsDneEZSg3YLRu/lGIfdOCs8/PydxyZnMD9TyeAf1TqR0iM+tHlBuosDX+ADG9leo99KTZp+Qmy/8xBIXz2LDBM2UG/7ksMpEnfIrOd4X/s68514dWv7RCBBh/XTZAqZTmMt6N6/+foAOYrYaQkWFaiYbsf1pHJeAeeBF8F8Of7476fgzTOLuuEGOvgzahfwq0LsXwn92cnflw5CsYEaGb3ViO1sLrWnLzlPs5QcLOUho5/xUqaWtAXe4buL2ImLiAu5lgjIaoc7VYGTxoctVrO/nOgNlPOKWGpRCT2eDSikQ1awkhrl1n/Glg17+xkG5g1CVLBQtJ1HyXHSFSqOoQ8/ywCio6xJQjY/OQ2l1LtpV4EGU2CnXX7ONfjSHB2uZRPuIk1/yKa1o63wZKNriUZdEyTkDzAbTQKUVKI3KpaNQsu8F/8vhFgT8WaGVbaPilAP0RDEJQaPLhcvtu68e3Xsd16vQbwH8cpwulVq5w95Z+o4mUboW6Jl4i7qQd5j0LTbK+zghviRSCY2NX5kbzLuJV67X2zlMIUa5qTKtBItA0RZIl8+A28AY3LXuvwjtFHK9GswFpQdRDVEySveSReehvkRfJVR66Uo6FlSBJaAaF+XTM+URaG5Cz1SWUPfKpzSiI9Q1juvqSueSoxRUNKd0dFRuG69oi5dQtAS6FwdbQeXTsQVshGuTq0GlVqoc5r20m7WAMkccr1zuSl86hvJw6sosOpJZGNaXyqR0klEo2aUfpZWe94L7wDhncVcCeM+J8VOexUwGixIpB9sNd04BvDfnHTBC3ZZokY38uRh8ERToXLDBfXbbNQyFrAfn4cQRdmFKfX30JFnOYFOTVT2F60zOQwWJsqPuUh8zGq1PHkUdnais21WJvvGn7UJKLcMJzvXLOXqfQG9CLcFks3kmBR7kb5xKY/ORw2OUeTqnip+dfC6YFLE+ykV0s2wtFn0VDpAHTz5e58xC1ZFrSzFvfdBTMrVAsx2ZMuAvntpTL3MQSDL1CCHoWpVdETYyTz5ELy+a4EgVFzS+gWx3UKrfRNmkCXZFyA9oqKCfAo5FuYg6Y5SM0vNRyi4Ze1wdqB4oc7QYq6LMDiSDIA36bNRyL2QVca1PqmVDQR8vzXfvCSzmrhyA3PYKfX2bGsvsUqwyhzur0Pk6nICfruRKVFVe8e3jn75+LFlaaSpkD9oPMtvpTCsIx4xfeSWljL7G6Yr6AdKRYxao+uAXz7gToxygoB7+7lsRWVzkkCqXsmfaVHiIjzqSdixANtCDLGdQniWkU2rJKSfvcGdUBc+PctUP6lPtR0DnqtklZh8tvpNx9G/R1Q6Xs7AAQaOseImSrE1fdy6Afi7c3wziI911IDuT/9hUx4A/TCGv5FQjIDuRDQUNjXS8Laiv95dshjchfZhCFEk5ku2QagyQtInhcrypMTg+YWQNRhQox9xQQQmCWeo7cmiyVb1AJQprAl3FJe+5ByocMIcq0ZfwF7ZS8xw/GRtYYbBfkS+kEzrAB1RJwDcLsAvQVS00zkOUz5QEea/t1tDl7mMKlJqhHSrQz0H2rB2uhxX9m+sKgzAcS3+KpH8O3Rp4ayfj16Ap59WHSr4fDcrSQZ4jXHeBDng+pzU4zSXPXbTUo3X4JIWBw4DOpZ+kjgYe2rGG4Q14x5FjMXzfA+qLyO5Xk9P+nnw7A3MfVOaQhh/lLOK750+RX59QfyKHbzGsw3kKMeg8zDUeOPx1jyd7HG0txhH0haani5IOiE6nwXM+5Z0JnyqeyTnkqH9WvJmZ56CD+A78arnvGjHSuPrioIb2mq2bbUup5NWNwJak51tbMU7kco6quhM4fRCx0PEUrgqcUbdlOyGsLWEKPMbEBnk/sQ795PMEeo6OmhrRCpFTQSAvnYLohOie8MfxDI/oICmjGoPXoR3aZJhcjbNs5pMxlV93Nzh+10cDP3CRZg63IyC0p2G339qS5B3Kx6MQQnsNryfmOArHHw2jAUMdKrGrVB6Gx6HShRUcHo9PF+YPn2tYknk5ilXrfMzQB2cbTnEDcotuSDPMrHvh/aGeuWGRMiR5h3mVHhyOd5h0PEcn92D5ROR4Gbk1HP+BsocCiB6NgV7UkqOqId9SSsMpunKGEEK+OgoG8w2fhXlO9kxRpLsPbYFoD07nbh77c7IyONnlOELBYPlEK6TnOqYvJa9fdElZyAxsxV3Jkak7pU/KcTJ+SnqCvnQzLK/OB8NgGQbfH5xeso2S92ASE3M+QY4/McKMn0pYKUNV2vgpj5wz5K2UbwX/kSUcW4qB8shIMeCxlinMP1S+8Hko1VDpwufDHUNaI9EI0w1HayQaw+Ud77NQrreC93hlfjvf2xp4WwNva+BtDbytgbc18Pujgf8Dda8OeZai5HwAAAAASUVORK5CYII="
      );
    }
  }
}

renderIntegrations();

renderBadges();
