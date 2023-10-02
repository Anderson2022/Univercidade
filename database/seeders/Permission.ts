import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class extends BaseSeeder {
  public async run() {
    await Permission.createMany([
      {
        "name": "dashboard_root",
        "description": "Dashboard Do Root"
      },
      {
        "name": "dashboard_adm",
        "description": "Dashboard Do Administrador"
      },
      {
        "name": "list_user",
        "description": "Listar Usuários"
      },
      {
        "name": "update_user",
        "description": "Atualizar Usuários"
      },
      {
        "name": "create_user",
        "description": "Criar usuários"
      },
      {
        "name": "delete_user",
        "description": "Deletar usuários"
      },
      {
        "name": "list_classes",
        "description": "Listar Classes"
      },
      {
        "name": "update_classes",
        "description": "Atualizar Classes"
      },
      {
        "name": "create_classes",
        "description": "Criar Classes"
      },
      {
        "name": "delete_classes",
        "description": "Deletar Classes"
      },
      {
        "name": "list_courses",
        "description": "Listar Cursos"
      },
      {
        "name": "update_courses",
        "description": "Atualizar Cursos"
      },
      {
        "name": "create_courses",
        "description": "Criar Cursos"
      },
      {
        "name": "delete_courses",
        "description": "Deletar Cursos"
      },
      {
        "name": "list_institution",
        "description": "Listar Instituição"
      },
      {
        "name": "update_institution",
        "description": "Atualizar Instituição"
      },
      {
        "name": "create_institution",
        "description": "Criar Instituição"
      },
      {
        "name": "delete_institution",
        "description": "Deletar Instituição"
      },

      {
        "name": "list_permission",
        "description": "Listar Permissão"
      },
      {
        "name": "update_permission",
        "description": "Atualizar Permissão"
      },
      {
        "name": "create_permission",
        "description": "Criar Permissão"
      },
      {
        "name": "delete_permission",
        "description": "Deletar Permissão"
      },
      {
        "name": "list_roles",
        "description": "Listar Perfil"
      },
      {
        "name": "update_roles",
        "description": "Atualizar Perfil"
      },
      {
        "name": "create_roles",
        "description": "Criar Perfil"
      },
      {
        "name": "delete_roles",
        "description": "Deletar Perfil"
      },
      {
        "name": "list_permissionRoles",
        "description": "Listar Perfis e Permissões"
      },
      {
        "name": "update_permissionRoles",
        "description": "Atualizar Perfis e Permissões"
      },
      {
        "name": "create_permissionRoles",
        "description": "Criar Perfis e Permissões"
      },
      {
        "name": "delete_permissionRoles",
        "description": "Deletar Perfis e Permissões"
      },
      {
        "name": "download_document",
        "description": "Baixar documento"
      },





    ])
  }
}
