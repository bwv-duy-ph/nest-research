import { MigrationInterface, QueryRunner } from 'typeorm';

export class addBaseColMigration1671509649707 implements MigrationInterface {
  name = 'addBaseColMigration1671509649707';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `user_entity` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` ADD `deletedAt` datetime(6) NULL',
    );
    await queryRunner.query(
      'ALTER TABLE `role_entity` ADD `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `role_entity` ADD `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
    );
    await queryRunner.query(
      'ALTER TABLE `role_entity` ADD `deletedAt` datetime(6) NULL',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE `role_entity` DROP COLUMN `deletedAt`',
    );
    await queryRunner.query(
      'ALTER TABLE `role_entity` DROP COLUMN `updatedAt`',
    );
    await queryRunner.query(
      'ALTER TABLE `role_entity` DROP COLUMN `createdAt`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` DROP COLUMN `deletedAt`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` DROP COLUMN `updatedAt`',
    );
    await queryRunner.query(
      'ALTER TABLE `user_entity` DROP COLUMN `createdAt`',
    );
  }
}
