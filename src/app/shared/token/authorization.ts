import { HttpHeaders } from "@angular/common/http";
import { StorageService } from "src/app/pages/auth/services/storage.service";

export class AuthorizationHeaderService {

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }

  public getAuthorizationHeader(): HttpHeaders {
    return this.createAuthorizationHeader();
  }
}