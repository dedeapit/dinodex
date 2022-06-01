import {MigrationInterface, QueryRunner} from "typeorm";

export class Initialize1625933012727 implements MigrationInterface {
    name = 'Initialize1625933012727'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `dinosaur_diet` (`createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dinosaur_time` (`createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dinosaur_type` (`createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `dinosaur` (`createdDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDateTime` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `length` int NULL, `typeId` int NOT NULL, `dietId` int NOT NULL, `timeId` int NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `dinosaur` ADD CONSTRAINT `FK_5b261ad09cbbf9485015db2b397` FOREIGN KEY (`typeId`) REFERENCES `dinosaur_type`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `dinosaur` ADD CONSTRAINT `FK_77e75f40988632b3caa0934a796` FOREIGN KEY (`dietId`) REFERENCES `dinosaur_diet`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `dinosaur` ADD CONSTRAINT `FK_633901d18aad1b08ea76f6988e9` FOREIGN KEY (`timeId`) REFERENCES `dinosaur_time`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `dinosaur` DROP FOREIGN KEY `FK_633901d18aad1b08ea76f6988e9`");
        await queryRunner.query("ALTER TABLE `dinosaur` DROP FOREIGN KEY `FK_77e75f40988632b3caa0934a796`");
        await queryRunner.query("ALTER TABLE `dinosaur` DROP FOREIGN KEY `FK_5b261ad09cbbf9485015db2b397`");
        await queryRunner.query("DROP TABLE `dinosaur`");
        await queryRunner.query("DROP TABLE `dinosaur_type`");
        await queryRunner.query("DROP TABLE `dinosaur_time`");
        await queryRunner.query("DROP TABLE `dinosaur_diet`");
    }

}
