import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialMigration1671504232758 implements MigrationInterface {
  name = 'initialMigration1671504232758';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `user_entity` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `fullName` varchar(50) NOT NULL, `username` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `roleId` int NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'CREATE TABLE `role_entity` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `flag` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` ADD CONSTRAINT `FK_95ab8e7157a5bb4bc0e51aefdd2` FOREIGN KEY (`roleId`) REFERENCES `role_entity`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_entity` DROP FOREIGN KEY `FK_95ab8e7157a5bb4bc0e51aefdd2`',
    );
    await queryRunner.query('DROP TABLE `role_entity`');
    await queryRunner.query('DROP TABLE `user_entity`');
  }
}
