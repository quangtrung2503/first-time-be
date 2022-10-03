import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Running';
  }

  // async onApplicationBootstrap() {
  //   console.log('onApplicationBootstrap');
  //   // Seeding admin user
  //   try {
  //     const adminUser = {
  //       username: 'admin',
  //       email: 'admin@cpie.com',
  //       password: '123456',
  //       fullname: 'Super Administrator',
  //       userType: 'Admin',
  //       verified: true,
  //       // referer: defaultReferer,
  //     };

  //     const user = await this.userService.findOne({
  //       username: adminUser.username,
  //     });
  //     if (!user || !user._id) {
  //       await this.userService.create(adminUser);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
}
