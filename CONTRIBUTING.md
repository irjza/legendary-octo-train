# Contributing to Shoutdle 🎤

Thank you for your interest in contributing to Shoutdle! We welcome contributions from the community.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Process](#development-process)
- [Submitting Changes](#submitting-changes)
- [Coding Standards](#coding-standards)
- [Testing](#testing)
- [Documentation](#documentation)

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/legendary-octo-train.git
   cd legendary-octo-train
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Create a branch** for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Process

### Running the Development Server

- **Web**: `npm start -- --web`
- **iOS**: `npm start -- --ios` (requires macOS)
- **Android**: `npm start -- --android`

### Making Changes

1. Make your changes in a feature branch
2. Test your changes thoroughly on target platforms
3. Ensure code follows the existing style and conventions
4. Update documentation as needed
5. Add or update tests if applicable

## Submitting Changes

1. **Commit your changes** with clear, descriptive commit messages:
   ```bash
   git commit -m "feat: add new feature description"
   ```

   Use conventional commit messages:
   - `feat:` for new features
   - `fix:` for bug fixes
   - `docs:` for documentation changes
   - `style:` for formatting changes
   - `refactor:` for code refactoring
   - `test:` for adding tests
   - `chore:` for maintenance tasks

2. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

3. **Submit a Pull Request**:
   - Go to the original repository on GitHub
   - Click "New Pull Request"
   - Select your fork and branch
   - Fill in the PR template with a clear description
   - Link any related issues

### Pull Request Guidelines

- Keep PRs focused on a single feature or fix
- Include a clear description of changes
- Reference any related issues
- Ensure all tests pass
- Update documentation as needed
- Request reviews from maintainers

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type when possible
- Use meaningful variable and function names

### Code Style

- Follow existing code formatting
- Use 2 spaces for indentation
- Use meaningful variable names
- Add comments for complex logic
- Keep functions small and focused

### React/React Native

- Use functional components with hooks
- Follow React best practices
- Optimize re-renders when necessary
- Handle errors gracefully

## Testing

- Test your changes on multiple platforms when possible
- Manually test voice recognition functionality
- Ensure game logic works correctly
- Test edge cases and error scenarios

## Documentation

When adding new features or making significant changes:

- Update the README.md if needed
- Document new APIs or functions
- Add inline code comments for complex logic
- Update ARCHITECTURE.md for structural changes
- Update CHANGELOG.md with your changes

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Reach out to the maintainers
- Check existing issues and PRs for similar questions

## License

By contributing, you agree that your contributions will be licensed under the same license as the project (ISC License).

Thank you for contributing to Shoutdle! 🎉
