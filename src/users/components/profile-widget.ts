import {WebComponent, VetproviehElement} from '@vetprovieh/vetprovieh-shared';
import {User} from '../models';
import {UserRepository} from '../repository';

// eslint-disable-next-line new-cap
@WebComponent({
  template: VetproviehElement.template + `
            <style>
                .username {
                    font-size: 18px;O
                }
            </style>
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <a href="/users/profile.html">
                            <p class="username is-5">
                                \${this.currentUser?.firstName}
                                \${this.currentUser?.lastName}
                            </p>
                        </a>
                        <p class="subtitle is-7">
                            \${this.currentUser?.tenant?.name}
                            \${this.currentUser?.tenant?.name2}
                        </p>
                    </div>
                </div>
                <div style="margin-top:5px">
                    <button id="logout"
                            class="button is-small is-danger is-outlined"
                            type="button">
                        Abmelden
                    </button>
                </div>
            </div>`,
  tag: 'profile-widget',
})
/**
 * Profile Widget shows current logged-in user
 */
export class ProfileWidget extends VetproviehElement {
  private repository: UserRepository = new UserRepository();

  // Current-User to Display
  private currentUser: User | undefined;

  /**
   * Default-Konstruktor
   */
  constructor() {
    super(true, false);
  }

  /**
   * Connected-Callback for Web-Components
   */
  connectedCallback() {
    super.connectedCallback();
    this.loadUser()
        .catch((error) => console.log(error));
  }

  /**
   * Load Current User Data
   */
  private async loadUser() {
    const profile = await this.repository.loadProfile();
    this.currentUser = profile;
    this.render();
    this.addEventListenerToLogout();
  }

  /**
   * Attach EventListener to logoutButton
   */
  private addEventListenerToLogout() {
    if (this.logoutButton) {
      this.logoutButton.addEventListener('click', () => {
        this.logout();
      });
    }
  }

  /**
   * LogoutButton abrufen
   */
  private get logoutButton(): HTMLButtonElement {
    return this.getByIdFromShadowRoot('logout') as HTMLButtonElement;
  }

  /**
   * Sign out current User
   */
  private logout() {
    this.repository.logout();
  }
}
